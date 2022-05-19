module.exports = async (d) => {
  var args = d.args;
  args = d.inside == "" ? args.join(" ") : args[Number(d.inside) - 1]

  return args? args : ""
};
