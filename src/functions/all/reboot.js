module.exports = async (d) => {
  try {
    process.on("exit", () => {
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
      });
    });
    process.exit();
  } catch (e) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Something error on $reboot: ${e}`);
  }

  return ""
};
