module.exports = async (d) => {
  var inside = d.code.split("$broadcast[")[1].split("]")[0];
  const [text, type] = inside.split(";");

if (!text || !type) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $broadcast[text;type (group/all)].`
    )
  }

  let group = await d.client.groupFetchAllParticipating();
  const g = []
  for (let i in group) {
    if(type === "all") {
      let p = await d.client.groupMetadata(i);
      let t = await p.participants.filter((o) => {
         g.push(o.id)
      });

      for (var j = 0; j < g.length; j++) {
        d.jid(g[j])
        return text
      }

    } else {
      d.jid(i)
      return text
    }
  }
};
