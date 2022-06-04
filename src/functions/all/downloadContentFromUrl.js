module.exports = async (d) => {
  const inside = d.inside;
  const { fileNameFromUrl } = require("../../models/functions.js");
  const fs = require("fs");
  const axios = require("axios");

  if (!fs.existsSync("./tmp")) {
    fs.mkdirSync("./tmp");
  }

  if (!inside) {
    d.isError = true;
    return d.error(
      "❌ WhatscodeError: Usage: $downloadContentFromUrl[url;file name (optional)]"
    );
  } else {
    const [l, fileName = fileNameFromUrl(inside)] = inside.split(";");
    const check = fileName.indexOf('.') > -1
    if (!check) {
      d.isError = true;
      return d.error(
        "❌ WhatscodeError: Something error in $downloadContentFromUrl: Can't match any file name. Try using filename and extension in it."
      );
    } else {
      async function saveDownloadImage(url) {
        const response = await axios({
          method: "get",
          url: url,
          responseType: "stream",
        }).catch((err) => {
          d.isError = true;
          d.error(
            `❌ WhatscodeError: Something error in $downloadContentFromUrl: ${err}`
          );
        });

        if (!response) {
          d.isError = true;
          return d.error(
            `❌ WhatscodeError: Something error in $downloadContentFromUrl: Maybe url is incorrect? or the website is down?`
          );
        } else {
          const writer = fs.createWriteStream("./tmp/" + fileName);
          response.data.pipe(writer);

          return new Promise((resolve, reject) => {
            writer.on("finish", () => {
              resolve();
            });
            writer.on("error", () => {
              reject();
            });
          });
        }
      }

      const asdf = await saveDownloadImage(inside);
      return "./tmp/" + fileName;
    }
  }
};
