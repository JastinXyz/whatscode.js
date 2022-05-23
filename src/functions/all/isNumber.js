module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $isNumber[some text]!`);
  } else {
    try {
      var re = inside.trim() === "" ? false : isNaN(inside) ? false : true;
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $isNumber!`
      );
    }

    return re;
  }
};
