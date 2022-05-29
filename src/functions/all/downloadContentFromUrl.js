module.exports = async (d) => {
  function fileNameFromUrl(url) {
    var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches.length > 1) {
      return matches[1];
    }
    return null;
  }

  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    d.error("❌ WhatscodeError: Usage: $downloadContentFromUrl[url]");
  } else {
    if (!inside.match(/\.(jpeg|jpg|gif|png|mp4|webp)$/)) {
      d.isError = true;
      d.error(
        "❌ WhatscodeError: Invalid url in $downloadContentFromUrl. Expected dot jpeg/jpg/gif/png/mp4/webp url. Received " +
          inside
      );
    } else {
      try {
        var response = await require("axios")({
          method: "get",
          url: inside,
          responseType: "stream",
        })
      } catch (e) {
        d.isError = true;
        d.error(`❌ WhatscodeError: Something error in $downloadContentFromUrl: ${e}`)
      }

      if(!response) {
        d.isError = true;
        d.error(`❌ WhatscodeError: Something error in $downloadContentFromUrl: Undefined`)
      } else {
        response.data.pipe(
          require("fs").createWriteStream("./tmp/" + fileNameFromUrl(inside))
        );

        return "./tmp/" + fileNameFromUrl(inside)
      }
    }
  }
};
