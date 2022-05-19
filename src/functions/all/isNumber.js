module.exports = async (d) => {
  const split = d.code.split("$isNumber").length - 1;
  const after = d.code.split("$isNumber")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$isNumber[")[1].split("]")[0];
    try {
    var re = inside.trim() === '' ? false : isNaN(inside) ? false : true
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $isNumber: ${err}!`
      );
    }

    return re
  } else {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $isNumber[some text]!`
    );
  }
};
