module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $includes[text;includes some text?]!`);
  } else {
    const [n, i] = inside.split(";");
    return n.includes(i)
  }
};
