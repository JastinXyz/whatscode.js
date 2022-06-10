module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $capitalizeFirstLetter[text]!`);
  } else {
    return inside.charAt(0).toUpperCase() + inside.slice(1);
  }
};
