module.exports = async(d) => {
  const inside = d.inside
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $let[name;value]')
  } else {
    let [text, value = ""] = inside.split(";")

    d.data[text] = value;
    return ""
  }
};
