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
      "❌ WhatscodeError: Usage: $downloadContentFromUrl[url;file name with file extension]"
    );
  } else {
    var [l, fileName] = inside.split(";");
    const check = /^https?:\/\//.test(l);
    if(!check) {
      d.isError = true;
      return d.error(
        "❌ WhatscodeError: Usage: $downloadContentFromUrl[URL;file name with file extension]"
      );
    }

    if (!fileName) {
      d.isError = true;
      return d.error(
        "❌ WhatscodeError: Something error in $downloadContentFromUrl: Can't match any file name. Try using file name and file extension in it. Usage: $downloadContentFromUrl[url;file name with file extension]"
      );
    } else {
      async function saveDownloadContent(url, f) {
        url = new URL(url);

        const response = await axios({
          method: "get",
          url: url.href,
          responseType: "arraybuffer",
        }).catch((err) => {
          d.isError = true;
          return d.error(
            `❌ WhatscodeError: Something error in $downloadContentFromUrl: ${err}`
          );
        });

        if (!response) {
          d.isError = true;
          return d.error(
            `❌ WhatscodeError: Something error in $downloadContentFromUrl: Maybe url is incorrect? or the website is down?`
          );
        } else {
          if(Buffer.isBuffer(response.data)) {
            return new Promise(async (resolve, reject) => {
              fs.writeFile(`./tmp/${f}`, response.data, function(err) {
                if (err) reject();
                else resolve();
              });
            });
          } else {
            d.isError = true;
            return d.error(`❌ WhatscodeError: Something error in $downloadContentFromUrl: Response is not a buffer.`)
          }
        }
      }

      const asdf = await saveDownloadContent(l, fileName);
      return "./tmp/" + fileName;
    }
  }
};
