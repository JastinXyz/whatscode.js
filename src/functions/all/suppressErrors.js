module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $suppressErrors[error message]!`);
  } else {
    d.unique = true;
    return {
      type: "error",
      response: inside,
    };
  }
};
