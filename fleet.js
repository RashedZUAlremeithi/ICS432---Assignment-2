(() => {
    "use strict";

    // Add data to the existing HTML table. The original index.html is unchanged.
    // These battery levels and statuses are fixed examples, not live readings.
    const fleetVehicles = [
    {
        "id": "EV-001",
        "model": "Tesla Model 3",
        "battery": 85,
        "status": "Available",
        "image": "images/tesla-model-3.jpg",
        "photoAuthor": "メイド理世",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Tesla_Model_3_front_(October_31,_2024).jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "id": "EV-002",
        "model": "Volkswagen ID.4",
        "battery": 64,
        "status": "On Trip",
        "image": "images/volkswagen-id4.jpg",
        "photoAuthor": "Dennis Elzinga",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2020_Volkswagen_ID.4_Pro_(Netherlands)_front_view.jpg",
        "photoLicense": "CC BY 2.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "id": "EV-003",
        "model": "Nissan LEAF",
        "battery": 19,
        "status": "Charging",
        "image": "images/nissan-leaf.jpg",
        "photoAuthor": "Jan Ainali",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Nissan-Leaf-front-right.jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "id": "EV-004",
        "model": "Hyundai IONIQ 5",
        "battery": 75,
        "status": "Available",
        "image": "images/hyundai-ioniq-5.jpg",
        "photoAuthor": "Alexander Migl",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Hyundai_Ioniq_5_IAA_2021_1X7A0189.jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "id": "EV-005",
        "model": "Kia EV6",
        "battery": 92,
        "status": "Available",
        "image": "images/kia-ev6.jpg",
        "photoAuthor": "Corqe",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2023_Denver_Auto_Show_Kia_EV6_front.jpg",
        "photoLicense": "CC0",
        "photoLicenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "id": "EV-006",
        "model": "BMW i4",
        "battery": 38,
        "status": "Charging",
        "image": "images/bmw-i4.jpg",
        "photoAuthor": "Alexander-93",
        "photoSource": "https://commons.wikimedia.org/wiki/File:BMW_i4_M50_1X7A7379.jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "id": "EV-007",
        "model": "Audi Q4 e-tron",
        "battery": 67,
        "status": "Available",
        "image": "images/audi-q4-e-tron.png",
        "photoAuthor": "ClubS1Video",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2021_Audi_Q4_e-tron_(Bulgaria)_front_view.png",
        "photoLicense": "CC BY 3.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by/3.0"
    },
    {
        "id": "EV-008",
        "model": "Ford Mustang Mach-E",
        "battery": 54,
        "status": "On Trip",
        "image": "images/ford-mustang-mach-e.jpg",
        "photoAuthor": "Corqe",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2023_Denver_Auto_Show_Ford_Mustang_Mach-E_front_left_quarter.jpg",
        "photoLicense": "CC0",
        "photoLicenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "id": "EV-009",
        "model": "Mercedes-Benz EQA",
        "battery": 28,
        "status": "Charging",
        "image": "images/mercedes-benz-eqa.jpg",
        "photoAuthor": "Tokumeigakarinoaoshima",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Mercedes-Benz_EQA250_(H243)_front.jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "id": "EV-010",
        "model": "Polestar 2",
        "battery": 81,
        "status": "Available",
        "image": "images/polestar-2.jpg",
        "photoAuthor": "Elise240SX",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2022_Polestar_2_in_Thunder,_Front_Right,_08-04-2022.jpg",
        "photoLicense": "CC BY-SA 4.0",
        "photoLicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    }
];

    // Share one vehicle list with calculator.js, which loads after this file.
    window.fleetVehicles = fleetVehicles;

    const statusClasses = {
        "Available": "status--available",
        "Charging": "status--charging",
        "On Trip": "status--on-trip"
    };

    // Use textContent so vehicle data cannot be interpreted as HTML.
    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function createVehicleRow(vehicle) {
        const row = document.createElement("tr");
        const idCell = createElement("th", "vehicle-id", vehicle.id);
        idCell.scope = "row";

        // Add the photograph inside the original Model column.
        const modelCell = document.createElement("td");
        const model = createElement("div", "vehicle-model");
        const image = document.createElement("img");
        image.alt = `${vehicle.model} electric vehicle`;
        image.loading = "lazy";
        image.decoding = "async";
        image.width = 112;
        image.height = 76;
        image.addEventListener("error", () => {
            image.replaceWith(createElement("span", "photo-unavailable", "Photo unavailable"));
        }, { once: true });
        image.src = vehicle.image;
        model.append(image, createElement("span", "vehicle-model__name", vehicle.model));
        modelCell.append(model);

        // Show a number as well as a bar so colour is not the only indicator.
        const batteryCell = document.createElement("td");
        const percentage = createElement("span", "battery-value", `${vehicle.battery}%`);
        let batteryClass = "battery--high";
        if (vehicle.battery <= 20) batteryClass = "battery--low";
        else if (vehicle.battery <= 50) batteryClass = "battery--medium";
        const bar = createElement("progress", `battery-bar ${batteryClass}`, `${vehicle.battery}%`);
        bar.max = 100;
        bar.value = vehicle.battery;
        bar.setAttribute("aria-label", `${vehicle.model} battery level`);
        batteryCell.append(percentage, bar);

        const statusCell = document.createElement("td");
        statusCell.append(createElement("span", `status ${statusClasses[vehicle.status] || ""}`, vehicle.status));
        row.append(idCell, modelCell, batteryCell, statusCell);
        return row;
    }

    function displayFleet() {
        // This ID is already present in the supplied HTML.
        const body = document.getElementById("vehicle-table-body");
        if (body) body.replaceChildren(...fleetVehicles.map(createVehicleRow));
    }

    function populateVehicleSelect() {
        // Reuse the original calculator dropdown without editing its markup.
        const select = document.getElementById("vehicle-select");
        if (!select) return;
        const previousSelection = select.value;
        const placeholder = createElement("option", "", "Select a vehicle");
        placeholder.value = "";
        const options = fleetVehicles.map((vehicle) => {
            const option = createElement("option", "", `${vehicle.id} - ${vehicle.model}`);
            option.value = vehicle.id;
            return option;
        });
        select.replaceChildren(placeholder, ...options);
        if (fleetVehicles.some((vehicle) => vehicle.id === previousSelection)) {
            select.value = previousSelection;
        }
    }

    function addFleetNotes() {
        const section = document.getElementById("fleet-overview");
        if (!section) return;

        // Add a note after the existing introduction; preserve its original text.
        if (!document.getElementById("fleet-demo-note")) {
            const note = createElement("p", "demo-note", "Demonstration data: battery levels and statuses are static examples.");
            note.id = "fleet-demo-note";
            const introduction = section.querySelector("p");
            if (introduction) introduction.insertAdjacentElement("afterend", note);
            else section.prepend(note);
        }

        // Add a small-screen hint while keeping the original table columns.
        if (!document.getElementById("fleet-scroll-note")) {
            const hint = createElement("p", "table-scroll-note", "Swipe the table left or right to see all vehicle details.");
            hint.id = "fleet-scroll-note";
            const table = section.querySelector("table");
            if (table) table.insertAdjacentElement("beforebegin", hint);
        }

        // Add photographer credits below the existing table.
        let credits = document.getElementById("fleet-photo-credits");
        if (!credits) {
            credits = createElement("details", "photo-credits");
            credits.id = "fleet-photo-credits";
            section.append(credits);
        }
        const list = document.createElement("ul");
        fleetVehicles.forEach((vehicle) => {
            const item = document.createElement("li");
            const source = createElement("a", "", vehicle.model);
            source.href = vehicle.photoSource;
            const licence = createElement("a", "", vehicle.photoLicense);
            licence.href = vehicle.photoLicenseUrl;
            item.append(source, `: ${vehicle.photoAuthor}. `, licence, ".");
            list.append(item);
        });
        credits.replaceChildren(createElement("summary", "", "Vehicle photo credits"), list);
    }

    function initializeFleet() {
        displayFleet();
        populateVehicleSelect();
        addFleetNotes();
    }

    // Support both the existing defer script tag and other loading methods.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeFleet, { once: true });
    } else {
        initializeFleet();
    }
})();
