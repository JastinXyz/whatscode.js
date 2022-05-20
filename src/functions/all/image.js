module.exports = async (d) => {
  const inside = d.inside;
  if (inside == "") {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $image[url]!`);
  } else {
    d.unique = true;
    return {
      type: "image",
      response: inside,
    };
  }
};
