module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $broadcast[text].`
    );
  } else {
    let group = await d.client.groupFetchAllParticipating();
    var g = [];
    for (let i in group) {
        g.push(i);
    }

    d.jid(g.removeDuplicates());
    return inside;
  }
};
