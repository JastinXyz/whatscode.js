module.exports = async (d) => {
  var inside = d.code.split(`$randomText[`)[1]

  if(!inside) {
    d.isError = true;
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      {
        text: `\`\`\`❌ [whatscode.js] | Usage: $randomText[text 1;text 2;text 3;...]!\`\`\``,
      },
      { quoted: d.msg }
    );
  } else {
    inside = inside.split("]")[0]
    const [...text] = inside.split(";");

    if (!text) {
      d.isError = true;
      return d.client.sendMessage(
        d.msg.key.remoteJid,
        {
          text: `\`\`\`❌ [whatscode.js] | Usage: $randomText[text 1;text 2;text 3;...]!\`\`\``,
        },
        { quoted: d.msg }
      );
    } else {
      return text[Math.floor(Math.random() * text.length)];
    }
  }
};
