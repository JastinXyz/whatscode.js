module.exports = async (d) => {
  const split = d.code.split("$setStatus").length - 1;
  const after = d.code.split("$setStatus")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$setStatus[")[1].split("]")[0];

    if(!inside) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Usage: $setStatus[some text]!`);
    }

    try {
        d.client.query({
          tag: "iq",
          attrs: {
            to: "@s.whatsapp.net",
            type: "set",
            xmlns: "status",
          },
          content: [
            {
              tag: "status",
              attrs: {},
              content: Buffer.from(inside, "utf-8"),
            },
          ],
        });
    } catch (err) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: Failed to set status!`);
    }

    return "";
  } else {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setStatus[some text]!`);
  }
};
