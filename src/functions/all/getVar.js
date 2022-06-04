module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $getVar[name]!`);
  } else {
    if (!await d.db.has(inside)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: variable ${inside} not found!`);
    }

    return await d.db.get(inside);
  }
};
