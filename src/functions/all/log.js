module.exports = async (d) => {
  const inside = d.code.split("$log[")[1].split("]")[0]
  return console.log(inside);
};
