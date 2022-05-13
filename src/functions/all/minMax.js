module.exports = async (d) => {
  const _s = require("scramb");
  var inside = d.code.split(`$minMax[`)[1]

  if(!inside) {
    d.isError = true;
    d.error(`❌ WhatscodeError: Usage: $minMax[min value;max value]!`)
  } else {
    inside = inside.split("]")[0]
    const [min, max] = inside.split(";");

    if (!min || !max) {
      d.isError = true;
      d.error(`❌ WhatscodeError: Usage: $minMax[min value;max value]!`)
    } else {
      return _s.minMax(Number(min), Number(max)).result;
    }
  }
};
