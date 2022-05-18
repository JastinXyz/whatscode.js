module.exports = async(d) => {
  const split = d.code.split("$groupName").length - 1;
  const after = d.code.split("$groupName")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$groupName[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $groupName[group jid (optional)]!`);
    }

    const groupN = await d.client.groupMetadata(inside);
    return groupN.subject;
  } else {
    const groupN = await d.client.groupMetadata(d.msg.key.remoteJid);
    return groupN.subject? groupN.subject : "";
  }
};
