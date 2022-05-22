module.exports = async (d) => {
  const r = d.code.split("$sendStories").length - 1;
  var inside = d.code.split("$sendStories[")[r];

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sendStories[text]!`);
  } else {
    inside = inside.split("]")[0];
    return inside;
  }
};
