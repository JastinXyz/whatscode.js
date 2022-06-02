module.exports = async (d) => {
  const inside = d.inside;
  var pattern = new RegExp('^(https?|http)://');

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $audio[url;as vn? (yes/no)]!`);
  } else {
    var [url, vn = "no"] = inside.split(";");

    if(!url.match(/\.(mp3|mp4|ogg)$/)) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Only .mp3/.mp4/.ogg path/url allowed in $audio!`);
    }

    if(!pattern.test(url)) {
      if(!require('fs').existsSync(url)) {
        d.isError = true;
        return d.error(`❌ WhatscodeError: Something error in $audio: invalid url or not found?!`);
      }
    }

      d.unique = true;
      return {
        type: "audio",
        response: { url, mimetype: `audio/mp4`, ptt: vn == "yes"? true : false },
      };

  }
};
