module.exports = async(d) => {
  const returnPath = d.inside;
  const fs = require('fs');
  const path = './tmp/recivedQuotedSticker.webp'
  const { check } = require("../../models/functions");

  if(!d.msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage) {
    return ""
  }

  if(!fs.existsSync('./tmp')) {
    await fs.mkdirSync('./tmp')
  }

  let object = d.msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
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
      await d.client.sendMessage(d.msg.key.remoteJid, { sticker: { url: './tmp/recivedQuotedSticker.webp' } }, check("$reply", d.theFuncs)? { quoted: d.msg } : undefined);
      await fs.unlinkSync(path)
      return ""
    }
};
