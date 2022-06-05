const ms = require("ms");

module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $wait[ms]!`);
  } else {
    if(isNaN(inside)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: invalid number in $wait!`);
    }
    
    await new Promise((e) => setTimeout(e, ms(inside)));

    return ""
  }
};
