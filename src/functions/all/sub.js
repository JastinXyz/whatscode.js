module.exports = async(d) => {
  const split = d.code.split("$sub").length - 1;
  const after = d.code.split("$sub")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$sub[")[1].split("]")[0];
    const [n, i] = inside.split(";");

    if(isNaN(n) || isNaN(i)) {
      d.isError = true;
      return d.client.sendMessage(d.msg.key.remoteJid, { text: `\`\`\`❌ [whatscode.js] | Invalid number in: $sub[${inside}]!\`\`\`` }, { quoted: d.msg })
    } else {
      return Number(n) - Number(i)
    }
  } else {
    d.isError = true;
    return d.client.sendMessage(d.msg.key.remoteJid, { text: `\`\`\`❌ [whatscode.js] | Usage: $sub[number;number]!\`\`\`` }, { quoted: d.msg })
  }
};
