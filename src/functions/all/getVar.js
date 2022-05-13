module.exports = async (d) => {
  const split = d.code.split("$getVar").length - 1;
  const after = d.code.split("$getVar")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$getVar[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $getVar[name]!`);
    }

    if(!d.db.has(inside)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${inside} not found!`)
    }

    return d.db.get(inside);
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $getVar[name]!`);
  }
};
