module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $uri[decode/encode;text]!`);
  } else {
    const [n, i] = inside.split(";");

    if (n === "decode") {
      return decodeURI(i)
    } else if (n === "encode") {
      return encodeURI(i)
    } else {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Only encode or decode in $uri first field!`);
    }
  }
};
