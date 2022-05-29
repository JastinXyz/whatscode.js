module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $deleteVar[name]`)
  } else {
    await d.db.delete(inside)
    return ""
  }
};
