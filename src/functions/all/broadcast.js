module.exports = async (d) => {
  const inside = d.inside;
  if (inside == "") {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $broadcast[text;type (group/all)].`
    );
  } else {
    const [text, type] = inside.split(";");

    if (!text || !type) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $broadcast[text;type (group/all)].`
      );
    }

    let group = await d.client.groupFetchAllParticipating();
    var g = [];
    for (let i in group) {
      if (type === "all") {
        let p = await d.client.groupMetadata(i);
        let t = await p.participants.filter((o) => {
          g.push(o.id);
        });
      } else {
        g.push(i);
      }
    }

    d.jid(g.removeDuplicates());
    return text;
  }
};
