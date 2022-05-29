module.exports = async (d) => {
  const inside = d.inside;
  const { fileNameFromUrl } = require('../../models/functions.js');
  const fs = require('fs');
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
        var picStream = fs.createWriteStream("./tmp/" + fileNameFromUrl(inside));
        response.data.pipe(picStream);

        return "./tmp/" + fileNameFromUrl(inside)
      }
    }
  }
};
