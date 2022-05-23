module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $addSectionsDisplayText[text]!`
    );
  } else {
    d.unique = true;
    return {
      type: "sectionsDisplayText",
      response: inside,
    };
  }
};
