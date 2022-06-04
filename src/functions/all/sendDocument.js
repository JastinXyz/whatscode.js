module.exports = async (d) => {
  const inside = d.inside;
  var pattern = new RegExp('^(https?|http)://');

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sendDocument[url;file name (optional)]!`);
  } else {
    var [url, filename] = inside.split(";");
    let check = inside.split('/').pop().indexOf('.') > -1;
    if(!check) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Only .extension file path/url allowed in $sendDocument!`);
    }

    if(!pattern.test(url)) {
      if(!require('fs').existsSync(url)) {
        d.isError = true;
        return d.error(`❌ WhatscodeError: Something error in $sendDocument: invalid url or not found?!`);
      }
    }

      d.unique = true;
      return {
        type: "document",
        response: { url, mimetype: `application/${url.split('.').pop()}`, filename: filename? filename : require("../../models/functions.js").fileNameFromUrl(url) },
      };

  }
};
