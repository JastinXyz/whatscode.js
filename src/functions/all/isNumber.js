module.exports = async (d) => {
  const split = d.code.split("$isNumber").length - 1;
  const after = d.code.split("$isNumber")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$isNumber[")[1].split("]")[0];
    try {
    re = inside.trim() === '' ? false : isNaN(inside) ? false : true
    return re
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $isNumber: ${err}!`
      );
    }

    return "";
  } else {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $isNumber[number]!`
    );
  }
};
