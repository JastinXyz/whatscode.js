module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $ordinal[number]!`);
  } else {
    if(isNaN(inside)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Invalid number provided in $ordinal!`);
    }

    function nth(n){return["st","nd","rd"][(((n<0?-n:n)+90)%100-10)%10-1]||"th"}
    return inside + nth(Number(inside))
  }
};
