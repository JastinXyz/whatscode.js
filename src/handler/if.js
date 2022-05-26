module.exports = async (n) => {
  const { getInside } = require("../models/functions.js");
  const code = n.code;
  let ifCond = getInside("$if", code);

  const r = code.toLowerCase().split(`$if[`).length - 1;
  const insIfEndIf = code.split(`$if[`)[r].split("$endIf")[0]

  if(ifCond.includes("$")) {
    ifCond = await require("../interpreter.js")(
      ifCond,
      n.msg,
      n.client,
      n.args,
      n.cmd,
      n.db,
      "",
      true
    );
  }

  const check = await require("../interpreter.js")(
    `$checkCondition[${ifCond}]`,
    n.msg,
    n.client,
    n.args,
    n.cmd,
    n.db,
    "",
    true
  );

  if(check) {
    // await require("../interpreter.js")(
    //   insIfEndIf,
    //   n.msg,
    //   n.client,
    //   n.args,
    //   n.cmd,
    //   n.db,
    // );
    console.log(insIfEndIf);
  }
};
