module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $toLowercase[text]!`);
  } else {
    return inside.toLowerCase()
  }
};
