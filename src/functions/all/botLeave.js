module.exports = async(d) => {
  try {
    await d.client.groupLeave(d.msg.key.remoteJid)
  } catch(err) {
    d.isError = true
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      {
        text: `\`\`\`❌ [whatscode.js] | Something error on $botLeave: ${err}!\`\`\``,
      },
      { quoted: d.msg }
    );
  }

  return ""
};
