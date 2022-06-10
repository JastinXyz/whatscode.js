module.exports = async(d) => {
  let inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $stringEndsWith[full text;ends with text]!`);
  } else {
    const [n, i] = inside.split(";");
    return n.endsWith(i)
  }
};
