module.exports = async (d) => {
  const inside = d.inside;
  var pattern = new RegExp('^(https?|http)://');

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $image[url]!`);
  } else {
    if(!pattern.test(inside)) {
      if(!require('fs').existsSync(inside)) {
        d.isError = true;
        return d.error(`❌ WhatscodeError: Something error in $image: invalid url?!`);
      }
    }

    d.unique = true;
    return {
      type: "image",
      response: inside,
    };
  }
};
