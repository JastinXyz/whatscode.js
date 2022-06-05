module.exports = async (d) => {
  var inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $jsEval[code;exec whatscode functions? (yes/no)]!`);
  } else {
    const [code, execF = "no"] = inside.split(";");
    
   if(execF === "yes") {
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

    return require("util").inspect(evaled, { depth: 0 });
  }
};
