module.exports = async(d) => {
  let inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $stringStartsWith[full text;starts with text]!`);
  } else {
    const [n, i] = inside.split(";");
    return n.startsWith(i)
  }
};
