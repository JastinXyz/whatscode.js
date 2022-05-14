module.exports = async(d) => {
  const split = d.code.split("$groupOwner").length - 1;
  const after = d.code.split("$groupOwner")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$groupOwner[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $groupOwner[group jid (optional)]!`);
    }

    const groupN = await d.client.groupMetadata(inside);
    return groupN.owner;
  } else {
    const groupN = await d.client.groupMetadata(d.msg.key.remoteJid);
    return groupN.owner? groupN.owner : "";
  }
};
