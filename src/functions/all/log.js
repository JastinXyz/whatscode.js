module.exports = async (d) => {
  const inside = d.code.split("$log[")[1].split("]")[0]
  await console.log(inside);
  return ""
};
