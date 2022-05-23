module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $replaceText[text;text to replace;replace to;how many (default: all) (optional)]')
  } else {
    var [text, textR, replaced, hm = "all"] = inside.split(";")

    if(hm == "all") {
      return text.replace(new RegExp(textR, 'g'), replaced)
    } else {
      if(isNaN(hm)) {
        d.isError = true;
        d.error('❌ WhatscodeError: invalid number in $replaceText "how many" session, expected number, received ' + typeof hm + '.')
      } else {
        for (var i = 0; i < hm; i++) {
          text = text.replace(textR, replaced)
        }
        return text;
      }
    }
  }
};
