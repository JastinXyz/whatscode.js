module.exports = async (d) => {
  const r = d.code.split("$reply").length - 1;
  var inside = d.code.split("$reply[")[r];

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $reply[text to reply]!`);
  } else {
    inside = inside.split("]")[0];
    return inside;
  }
};
