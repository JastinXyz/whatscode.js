module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    d.error("❌ WhatscodeError: Usage: $getObjectProperty[property]");
  } else {
    return JSON.stringify(eval(`d.data.createObject?.${inside}`))
  }
};
