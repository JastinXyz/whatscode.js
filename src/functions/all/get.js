module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    d.error("❌ WhatscodeError: Usage: $get[name]");
  } else {
      return d.data[inside]? d.data[inside] : "";
  }
};
