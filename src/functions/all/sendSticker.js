module.exports = async (d) => {
  const inside = d.inside;
  const fs = require('fs');
  const axios = require('axios')
  const { check } = require("../../models/functions");
  if (!inside) {
    d.isError = true;
    return d.error("❌ WhatscodeError: Usage: $sendSticker[image path]");
  } else {
    var [url, packname = "Whatscode Sticker", author = "npmjs.com/whatscode.js"] = inside.split(
      ";"
    );
    try {
      var a = await axios.post('https://whatscode.api.jstnlt.my.id/api/sticker', {
        headers: {
          "User-Agent": `Whatsapp Bot using Whatscode.js (https://npmjs.com/whatscode.js, ${require("../../../package.json").version})`
        },
        data: {
          buffer: fs.readFileSync(url),
          packname,
          author,
          emoji: [""],
          id: "npmjs.com/whatscode.js",
          bufferRes: false
        }
      })

      await fs.writeFileSync("./tmp/prepareSticker.webp", Buffer.from(a.data.sticker.data))
    } catch(e) {
      console.log(e);
      d.isError = true;
      return d.error(`❌ WhatscodeError: Something error in $sendSticker: ${e}`)
    }

    d.unique = true;
    return {
      type: "sticker",
      response: { url: './tmp/prepareSticker.webp' },
    };
  }
};
