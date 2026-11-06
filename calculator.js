"use strict";

// Fixed prototype values supplied in the assignment, not live electricity rates.
const CHARGING_POWER_KW = 7.5;
const PRICE_PER_KWH_USD = 0.15;

// Keep the calculation separate from the page so it can be unit tested.
function calculateChargingCost(hours) {
    if (typeof hours !== "number" && typeof hours !== "string") {
        throw new TypeError("Enter a valid charging duration.");
    }
    if (typeof hours === "string" && hours.trim() === "") {
        throw new TypeError("Enter a charging duration in hours.");
    }

    const duration = Number(hours);
    if (!Number.isFinite(duration) || duration < 0) {
        throw new RangeError("Charging duration must be zero or a positive number.");
    }

    // Cost = hours × 7.5 kW × $0.15 per kWh.
    const cost = duration * CHARGING_POWER_KW * PRICE_PER_KWH_USD;
    if (!Number.isFinite(cost)) {
        throw new RangeError("Enter a smaller charging duration.");
    }
    return cost;
}

// Node's built-in test runner can import the function without loading a browser.
if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculateChargingCost };
}

// Add behaviour to the form and result paragraph already in the original HTML.
if (typeof document !== "undefined") {
    function initializeCalculator() {
        const form = document.getElementById("calculator-form");
        const select = document.getElementById("vehicle-select");
        const hoursInput = document.getElementById("charging-hours");
        const result = document.getElementById("cost-result");
        if (!form || !select || !hoursInput || !result) return;

        const currency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        });

        // Clear an old estimate when its vehicle or duration changes.
        function clearEstimate() {
            result.classList.remove("is-error");
            result.textContent = "Choose a vehicle and duration, then select Calculate Cost.";
        }
        select.addEventListener("change", clearEstimate);
        hoursInput.addEventListener("input", clearEstimate);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            result.classList.remove("is-error");
            try {
                const vehicle = (window.fleetVehicles || []).find((item) => item.id === select.value);
                if (!vehicle) throw new Error("Please select a vehicle from the fleet.");
                const cost = calculateChargingCost(hoursInput.value);

                // textContent safely displays both the model name and result.
                result.textContent = `Estimated charging cost for ${vehicle.model}: ${currency.format(cost)} (USD).`;
            } catch (error) {
                result.classList.add("is-error");
                result.textContent = error.message;
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeCalculator, { once: true });
    } else {
        initializeCalculator();
    }
}
