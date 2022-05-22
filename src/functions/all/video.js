module.exports = async (d) => {
  const inside = d.inside;
  if (inside == "") {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $video[url]!`);
  } else {
    var [url, playback = "no"] = inside.split(";");

    d.unique = true;
    return {
      type: "video",
      response: { url, playback: playback == "yes"? true : false },
    };
  }
};
