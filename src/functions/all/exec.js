module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $exec[code]!`);
  } else {
    try {
      var execute = await require("child_process").execSync(inside);
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: $exec error: ${err}!`);
    }

    return execute.toString();
  }
};
