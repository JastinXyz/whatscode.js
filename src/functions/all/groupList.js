module.exports = async (d) => {
  let inside = d.inside;
  let group = await d.client.groupFetchAllParticipating();
  var g = [];
  for (let i in group) {
      g.push(i);
  }

  g = g.removeDuplicates()
  return inside? g.join(inside) : g.join(", ");
};
