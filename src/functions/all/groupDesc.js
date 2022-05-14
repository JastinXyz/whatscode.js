module.exports = async(d) => {
  const split = d.code.split("$groupDesc").length - 1;
  const after = d.code.split("$groupDesc")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$groupDesc[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $groupDesc[group jid (optional)]!`);
    }

    const groupN = await d.client.groupMetadata(inside);
    return groupN.desc.toString();
  } else {
    const groupN = await d.client.groupMetadata(d.msg.key.remoteJid);
    return groupN.desc.toString()? groupN.desc.toString() : "";
  }
};
