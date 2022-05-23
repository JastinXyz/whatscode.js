module.exports = async(d) => {
  const inside = d.inside
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $textSplit[text;splitted by?]')
  } else {
    let [text, splitted = ""] = inside.split(";")

    d.data.splitText = text.split(splitted)
    return ""
  }
};
