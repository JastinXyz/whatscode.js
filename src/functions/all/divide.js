module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $divide[number;number;...]!`);
  } else {
    const [...i] = inside.split(";");

    if (i.some((n) => isNaN(Number(n)))) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Invalid number in: $divide[${inside}]!`);
    } else {
      return i.reduce((x, y) => Number(x) / Number(y));
    }
  }
};
