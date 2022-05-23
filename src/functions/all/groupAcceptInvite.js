module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $groupAcceptInvite[invite link]!`
    );
  } else {
    try {
      let g = inside.split("https://chat.whatsapp.com/")[1];
      await d.client.groupAcceptInvite(g);
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $groupAcceptInvite: ${err}!`
      );
    }

    return "";
  }
};
