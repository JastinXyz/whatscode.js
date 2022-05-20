module.exports = async (d) => {
  const inside = d.inside;

  const r = await d.client.groupInviteCode(
    inside == "" ? d.msg.key.remoteJid : inside
  );
  if (!r) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: invalid groups jid!`);
  }

  return r;
};
