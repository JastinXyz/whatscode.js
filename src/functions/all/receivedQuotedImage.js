module.exports = async(d) => {
  const returnPath = d.inside;
  const fs = require('fs');
  const path = './tmp/recivedQuotedImage.png'
  const { check } = require("../../models/functions");

  if(!d.msg.message.extendedTextMessage) {
    return ""
  }

  if(!fs.existsSync('./tmp')) {
    await fs.mkdirSync('./tmp')
  }

  let object = d.msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
  if(object.url === "https://web.whatsapp.net") {
    object['url'] = 'https://mmg.whatsapp.net' + object.directPath
  }

    const stream = await require('@adiwajshing/baileys').downloadContentFromMessage(
      object,
      'image',
    );

    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    await fs.writeFileSync(path, buffer);
    if(returnPath === "yes") {
      return path
    } else {
      d.unique = true;
      return {
        type: "image",
        response: path,
      };
    }
};
