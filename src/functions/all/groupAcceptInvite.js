module.exports = async (d) => {
  const split = d.code.split("$groupAcceptInvite").length - 1;
  const after = d.code.split("$groupAcceptInvite")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$groupAcceptInvite[")[1].split("]")[0];

    try {
      let g = inside.split("https://chat.whatsapp.com/")[1];
      await d.client.groupAcceptInvite(g);
    } catch (err) {
      d.isError = true;
      return d.client.sendMessage(
        d.msg.key.remoteJid,
        {
          text: `\`\`\`❌ [whatscode.js] | Something error on $groupAcceptInvite: ${err}!\`\`\``,
        },
        { quoted: d.msg }
      );
    }

    return ""
  } else {
    d.isError = true;
    return d.client.sendMessage(d.msg.key.remoteJid, { text: `\`\`\`❌ [whatscode.js] | Usage: $groupAcceptInvite[invite link]!\`\`\`` }, { quoted: d.msg })
  }
};
