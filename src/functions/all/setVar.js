module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setVar[name;value]!`);
  } else {
    const [name, value] = inside.split(";");

    if (!inside || !name || !value) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $setVar[name;value]!`);
    }

    if (!await d.db.has(name)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${inside} not found!`);
    }

    await d.db.set(name, value);
    return "";
  }
};
