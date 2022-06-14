module.exports = async (d) => {
  var code = d.inside;
  if (!code) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code;show return? (yes/no) (optional, default: no)]!`);
  } else {
    code = code.split(";");
    var opts = "no"
    if (["yes", "no"].includes(code[code.length - 1])) {
      opts = code[code.length - 1];
      code.pop();
    }

    code = code.join(";")

    if(d.command.jsEvalFuncExec) {
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
    }

    try {
      var evaled = await eval(code);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $jsEval error: ${err}!`);
    }

    if(opts === "yes") {
      return require("util").inspect(evaled, { depth: 0 });
    } else {
      return ""
    }
  }
};
