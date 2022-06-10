module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $indexOf[text;char]!`);
  } else {
    const [n, i] = inside.split(";");
    return n.indexOf(i) + 1
  }
};
