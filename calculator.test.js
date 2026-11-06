"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateChargingCost } = require("../calculator.js");

test("four charging hours cost $4.50", () => {
    assert.equal(calculateChargingCost(4), 4.5);
});

test("fractional hours use the same fixed rate", () => {
    assert.equal(calculateChargingCost(0.5), 0.5625);
});

test("a numeric string from the form is accepted", () => {
    assert.equal(calculateChargingCost("2"), 2.25);
});

test("zero hours cost zero dollars", () => {
    assert.equal(calculateChargingCost(0), 0);
});

test("negative durations produce a validation error", () => {
    assert.throws(() => calculateChargingCost(-1), RangeError);
    assert.throws(() => calculateChargingCost("-2"), RangeError);
});

test("non-numeric durations produce a validation error", () => {
    assert.throws(() => calculateChargingCost("abc"), RangeError);
    assert.throws(() => calculateChargingCost(NaN), RangeError);
});

test("empty values and unsupported types are rejected instead of becoming zero", () => {
    for (const input of ["", "   ", null, undefined, true, [], {}]) {
        assert.throws(() => calculateChargingCost(input), TypeError);
    }
});

test("infinite durations and overflowing costs are rejected", () => {
    assert.throws(() => calculateChargingCost(Infinity), RangeError);
    assert.throws(() => calculateChargingCost("Infinity"), RangeError);
    assert.throws(() => calculateChargingCost(1e308), RangeError);
});
