module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $minMax[min value;max value]!`);
  } else {
    const [min, max] = inside.split(";");

    if (!min || !max) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $minMax[min value;max value]!`);
    } else if (isNaN(min) || isNaN(max)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Invalid number on $minMax`);
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
