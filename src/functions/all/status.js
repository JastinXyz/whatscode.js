module.exports = async (d) => {
  const inside = d.code.split("$status[")[1].split("]")[0]
  const r = await d.client.fetchStatus(inside)
  return r.status
};
