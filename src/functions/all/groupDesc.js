module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    const groupN = await d.client.groupMetadata(d.msg.key.remoteJid);
    return groupN.desc.toString()? groupN.desc.toString() : "";
  } else {
    const groupN = await d.client.groupMetadata(inside);
    return groupN.desc.toString()? groupN.desc.toString() : "";
  }
};
