module.exports = async (d) => {
  const inside = d.inside;
  const { isUrl } = require('../../models/functions')

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $isURL[some text]!`);
  } else {
    try {
      var re = inside.trim() === "" ? false : isUrl(inside);
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $isURL!`
      );
    }

    return re;
  }
};
