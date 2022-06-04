module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $setStatus[some text]!`);
  } else {
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

    return inside;
  }
};
