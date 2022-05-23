module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    d.error("❌ WhatscodeError: Usage: $splitText[position]");
  } else {
    if (isNaN(parseInt(inside - 1)) || parseInt(inside - 1) < 0) {
      d.isError = true;
      d.error("❌ WhatscodeError: invalid number in $splitText");
    } else {
      return d.data.splitText? d.data.splitText[inside - 1] : "";
    }
  }
};
