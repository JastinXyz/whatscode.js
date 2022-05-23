module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $templateButtons[(url/call/quickReply):display Text:value;...]!`
    );
  } else {
    const [...btn] = inside.split(";");

    if (!btn) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $templateButtons[(url/call/quickReply):display Text:value;...].`
      );
    }

    const buttons = [];

    for (let bttns of btn) {
      const [index, display, v] = bttns.split(":");
      const a = bttns.split(":");
      if (index === "url") {
        buttons.push({
          index: 1,
          urlButton: {
            displayText: display,
            url: a[a.length - 2] + ":" + a[a.length - 1],
          },
        });
      } else if (index === "call") {
        buttons.push({
          index: 2,
          callButton: { displayText: display, phoneNumber: v },
        });
      } else if (index === "quickReply") {
        buttons.push({
          index: 3,
          quickReplyButton: { displayText: display, id: v },
        });
      }
    }

    d.unique = true;
    return {
      type: "templateButtons",
      response: buttons,
    };
  }
};
