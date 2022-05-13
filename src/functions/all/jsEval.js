module.exports = async (d) => {
  const split = d.code.split("$jsEval").length - 1;
  const after = d.code.split("$jsEval")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$jsEval[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $jsEval[code]!`);
    }
    try {
      var evaled = await eval(inside);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $jsEval error: ${err}!`);
    }

    return require("util").inspect(evaled, { depth: 0 });
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code]!`);
  }
};
