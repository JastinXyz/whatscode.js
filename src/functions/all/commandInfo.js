module.exports = async(d) => {
  let inside = d.inside;
  const cmd = d.cmd;
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $commandInfo[command name;property (optional)]');
  } else {
    const [command, proper = "name"] = inside.split(";");
    const valArr = Array.from(cmd.values());
    const val = valArr.find(
      (c) =>
        c.name.toLowerCase() === command.toLowerCase() ||
        (c.aliases && typeof c.aliases === "object"
          ? c.aliases.includes(command.toLowerCase())
          : c.aliases === command.toLowerCase())
    );

    return eval(`val.${proper}? Array.isArray(val.${proper})? val.${proper}.join(", ") : val.${proper} : ""`)
  }
};
