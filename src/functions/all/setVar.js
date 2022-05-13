module.exports = async (d) => {
  const split = d.code.split("$setVar").length - 1;
  const after = d.code.split("$setVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$setVar[")[1].split("]")[0];
    const [name, value] = inside.split(";");

    if (!inside || !name || !value) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $setVar[name;value]!`);
    }

    if(!d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${inside} not found!`)
    }

    await d.db.set(name, value);
    return ""
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setVar[name;value]!`);
  }
};
