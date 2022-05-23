module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $commandReact[emoji]!`);
  } else {
    const reactionMessage = {
      react: {
        text: inside,
        key: d.msg.key,
      },
    };

    await d.client.sendMessage(d.msg.key.remoteJid, reactionMessage);
    return "";
  }
};
