module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $createVar[name:value;name:value;...]`)
  } else {
    const [...v] = inside.split(";")

    for (const vars of v) {
      const [name, value] = vars.split(":")
      d.db.set(name, value);
    }

    return ""
  }
};
