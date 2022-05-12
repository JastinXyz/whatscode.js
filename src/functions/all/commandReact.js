module.exports = async (d) => {
  const split = d.code.split("$commandReact").length - 1;
  const after = d.code.split("$commandReact")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$commandReact[")[1].split("]")[0];
    const reactionMessage = {
      react: {
        text: inside,
        key: d.msg.key,
      },
    };

    await d.client.sendMessage(d.msg.key.remoteJid, reactionMessage);
    return "";
  } else {
    d.isError = true;
    return d.client.sendMessage(d.msg.key.remoteJid, { text: `\`\`\`❌ [whatscode.js] | Usage: $commandReact[emoji]!\`\`\`` }, { quoted: d.msg })
  }
};
