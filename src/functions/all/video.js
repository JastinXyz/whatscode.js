module.exports = async (d) => {
  const inside = d.inside;
  var pattern = new RegExp('^(https?|http)://');

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $video[url;playback? (yes/no)]!`);
  } else {
    var [url, playback = "no"] = inside.split(";");

    if(!pattern.test(url)) {
      if(!require('fs').existsSync(url)) {
        d.isError = true;
        return d.error(`❌ WhatscodeError: Something error in $video: invalid url?!`);
      }
    }

      d.unique = true;
      return {
        type: "video",
        response: { url, playback: playback == "yes"? true : false },
      };

  }
};
