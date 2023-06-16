const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function () {
    assert.equal(convertHandler.getNum("3gal"), 3);
  });

  test("convertHandler should correctly read a decimal number input", function () {
    assert.equal(convertHandler.getNum("3.1gal"), 3.1);
  });

  test("convertHandler should correctly read a fractional input", function () {
    assert.equal(convertHandler.getNum("3/2gal"), 1.5);
  });

  test("convertHandler should correctly read a fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("3.1/2gal"), 1.55);
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
    assert.equal(convertHandler.getNum("3/2/3gal"), "invalid number");
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    assert.equal(convertHandler.getNum("gal"), 1);
  });

  test("convertHandler should correctly read each valid input unit", function () {
    assert.equal(convertHandler.getUnit("3gal"), "gal");
    assert.equal(convertHandler.getUnit("3.1L"), "L");
    assert.equal(convertHandler.getUnit("3/2mi"), "mi");
    assert.equal(convertHandler.getUnit("3.1km"), "km");
    assert.equal(convertHandler.getUnit("3/2lbs"), "lbs");
    assert.equal(convertHandler.getUnit("3.1kg"), "kg");
  });

  test("convertHandler should correctly return an error for an invalid input unit", function () {
    assert.equal(convertHandler.getUnit("3gall"), "invalid unit");
  });

  test("convertHandler should return the correct return unit for each valid input unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("convertHandler should correctly convert gal to L", function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
  });

  test("convertHandler should correctly convert L to gal", function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
  });

  test("convertHandler should correctly convert mi to km", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
  });

  test("convertHandler should correctly convert km to mi", function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
  });

  test("convertHandler should correctly convert lbs to kg", function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
  });

  test("convertHandler should correctly convert kg to lbs", function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });
});
