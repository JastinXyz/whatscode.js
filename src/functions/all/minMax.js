module.exports = async (d) => {
  const _s = require("scramb");
  var inside = d.code.split(`$minMax[`)[1]

  if(!inside) {
    d.isError = true;
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      {
        text: `\`\`\`❌ [whatscode.js] | Usage: $minMax[min value;max value]!\`\`\``,
      },
      { quoted: d.msg }
    );
  } else {
    inside = inside.split("]")[0]
    const [min, max] = inside.split(";");

    if (!min || !max) {
      d.isError = true;
      return d.client.sendMessage(
        d.msg.key.remoteJid,
        {
          text: `\`\`\`❌ [whatscode.js] | Usage: $minMax[min value;max value]!\`\`\``,
        },
        { quoted: d.msg }
      );
    } else {
      return _s.minMax(Number(min), Number(max)).result;
    }
  }
};
