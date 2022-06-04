module.exports = async (d) => {
  var inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code]!`);
  } else {
    if (inside.includes("$")) {
      inside = await require("../../interpreter")(
        inside,
        d.msg,
        d.client,
        d.args,
        d.cmd,
        d.db,
        "",
        true
      );
    }

    try {
      var evaled = await eval(inside);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $jsEval error: ${err}!`);
    }

    return require("util").inspect(evaled, { depth: 0 });
  }
};
