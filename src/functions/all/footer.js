module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $footer[text]!`);
  } else {
    d.unique = true;
    return {
      type: "footer",
      response: inside,
    };
  }
};
