function ConvertHandler() {
  //function that returns only number part of input. if no number, return 1. if invalid number, return invalid number.
  this.getNum = function (input) {
    let result;

    let num = input.split(/[a-z]+/i)[0];

    if (num === "" || !num) {
      result = 1;
    } else if (num.includes("/")) {
      let fraction = num.split("/");
      if (fraction.length > 2) {
        result = "invalid number";
      } else {
        result = fraction[0] / fraction[1];
      }
    } else if (isNaN(num)) {
      result = "invalid number";
    } else {
      result = +num;
    }

    return result;
  };

  //function that returns only the unit part of input. if no unit, return invalid unit. if invalid unit, return error. if valid unit, return unit.
  this.getUnit = function (input) {
    let result;

    const unit =
      input.split(/[^a-z]+/i).length < 2
        ? input.split(/[^a-z]+/i)[0]
        : input.split(/[^a-z]+/i)[1];

    let unitFormat = unit?.toLowerCase();

    if (unitFormat === undefined) {
      result = "invalid unit";
    } else if (
      unitFormat === "gal" ||
      // unitFormat === "l" ||
      unitFormat === "mi" ||
      unitFormat === "km" ||
      unitFormat === "lbs" ||
      unitFormat === "kg"
    ) {
      result = unitFormat;
    } else if (unitFormat === "l") {
      result = "L";
    } else {
      result = "invalid unit";
    }
    return result;
  };

  //function that returns the converted unit from the result of this.getUnit(). if invalid unit, return error. if valid unit, return converted unit. gal is connected to l, lbs is connected to kg, mi is connected to km.
  this.getReturnUnit = function (initUnit) {
    if (initUnit === "gal") {
      return "L";
    }
    if (initUnit === "l" || initUnit === "L") {
      return "gal";
    }
    if (initUnit === "lbs") {
      return "kg";
    }
    if (initUnit === "kg") {
      return "lbs";
    }
    if (initUnit === "mi") {
      return "km";
    }
    if (initUnit === "km") {
      return "mi";
    } else {
      return "invalid unit";
    }
  };

  this.spellOutUnit = function (unit) {
    const units = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };
    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return +(initNum * galToL).toFixed(5);
      case "lbs":
        return +(initNum * lbsToKg).toFixed(5);
      case "mi":
        return +(initNum * miToKm).toFixed(5);
      case "L":
        return +(initNum / galToL).toFixed(5);
      case "kg":
        return +(initNum / lbsToKg).toFixed(5);
      case "km":
        return +(initNum / miToKm).toFixed(5);
      default:
        return initNum;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const spelledOutInitUnit = this.spellOutUnit(initUnit);
    const spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;
  };
}

module.exports = ConvertHandler;
