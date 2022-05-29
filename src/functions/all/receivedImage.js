module.exports = async(d) => {
  const returnUrl = d.inside;
  const fs = require('fs');
  const path = './tmp/receivedImage.png'

  if(!d.msg.message.imageMessage) {
    return ""
  }

  if(!fs.existsSync('./tmp')) {
    await fs.mkdirSync('./tmp')
  }

    const stream = await require('@adiwajshing/baileys').downloadContentFromMessage(
      d.msg.message.imageMessage,
      'image',
    );

    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    await fs.writeFileSync(path, buffer);
    d.unique = true;
    return returnUrl === "yes"? path : {
      type: "image",
      response: path
    };
};
