const msParser = require('ms-parser');
module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $parseDuration[time;property (ms/readable) (optional, default: ms)]. e.g $parseDuration[5s]!`);
  } else {
    const [n, i = "ms"] = inside.split(";");
    try {
      var res = msParser(n);
    } catch (e) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Somehting error in $parseDuration: ${e}!`);
    }

    if(i === "ms") {
      return res.ms
    } else if(i === "readable") {
      return res.string
    } else {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Something error in $parseDuration: Invalid property. only ms or readable allowed!`);
    }
  }
};
