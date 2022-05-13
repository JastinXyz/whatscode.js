module.exports = async (d) => {
  const split = d.code.split("$templateButtons").length - 1;
  const after = d.code.split("$templateButtons")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$templateButtons[")[1].split("]")[0];
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
  } else {
    d.isError = true;
    return d.client.sendMessage(
      d.msg.key.remoteJid,
      {
        text: `\`\`\`❌ WhatscodeError: Usage: $templateButtons[(url/call/quickReply):display Text:value;...]!\`\`\``,
      },
      { quoted: d.msg }
    );
  }
};
