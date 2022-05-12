module.exports = async (d) => {
  // const r = d.command.code.split("$reply").length
  // if (r >= 3) return d.client.sendMessage(`\`\`\`❌ [whatscode.js] | Can't use more than one $reply.\`\`\``)

  const r = d.code.split("$reply").length - 1
  var inside = d.code.split("$reply[")[r];

  if(!inside) {
    d.isError = true;
    return d.client.sendMessage(d.msg.key.remoteJid, { text: `\`\`\`❌ [whatscode.js] | Usage: $reply[text to reply]!\`\`\`` }, { quoted: d.msg })
  } else {
    inside = inside.split("]")[0];
    return inside;
  }
};
