module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $messageSlice[from;to (optional)]`)
  } else {
    const [f, to = d.args.length] = inside.split(";");
    if(isNaN(f) || isNaN(to)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Invalid number in $messageSlice`)
    }

    return d.args.slice(f, to + 1).join(" ")
  }
};
