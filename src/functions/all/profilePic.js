module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");
  const split = d.code.split("$profilePic").length - 1;
  const after = d.code.split("$profilePic")[split];

  if (after.startsWith("[")) {
    var inside = d.code.split("$profilePic[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $profilePic[jid].`);
    }

    const num = decodeJid(inside);

    try {
      var pp = await d.client.profilePictureUrl(num, 'image');
    } catch (err) {
      return "https://imgdb.jstnlt.my.id/img/profile.png";
    }

    return pp.trim() === "" ? "https://imgdb.jstnlt.my.id/img/profile.png" : pp;
  } else {
    const num = decodeJid(sender(d));

    try {
      var pp = await d.client.profilePictureUrl(num, 'image');
    } catch (err) {
      return "https://imgdb.jstnlt.my.id/img/profile.png";
    }

    return pp.trim() === "" ? "https://imgdb.jstnlt.my.id/img/profile.png" : pp;
  }
};
