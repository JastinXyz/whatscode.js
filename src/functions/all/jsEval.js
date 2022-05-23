module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code]!`);
  } else {
    try {
      var evaled = await eval(inside);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $jsEval error: ${err}!`);
    }

    return require("util").inspect(evaled, { depth: 0 });
  }
};
