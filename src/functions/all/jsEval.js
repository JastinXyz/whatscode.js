module.exports = async (d) => {
  var code = d.inside;
  if (!code) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code]!`);
  } else {
    if (code.includes("$")) {
      code = await require("../../interpreter")(
        code,
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
      var evaled = await eval(code);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $jsEval error: ${err}!`);
    }

    return require("util").inspect(evaled, { depth: 0 });
  }
};
