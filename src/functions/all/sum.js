module.exports = async (d) => {
  const inside = d.inside;
  if (inside == "") {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sub[number;number]!`);
  } else {
    const [n, i] = inside.split(";");

    if (isNaN(n) || isNaN(i)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Invalid number in: $sub[${inside}]!`);
    } else {
      return Number(n) + Number(i);
    }
  }
};
