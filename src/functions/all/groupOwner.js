module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    const groupN = await d.client.groupMetadata(d.msg.key.remoteJid);
    return groupN.owner? groupN.owner : "";
  } else {
    const groupN = await d.client.groupMetadata(inside);
    return groupN.owner;
  }
};
