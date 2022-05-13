module.exports = async(d) => {
  const r = d.code.split("$eval").length - 1
  var inside = d.code.split("$eval[")[r]
  const last = inside.lastIndexOf(']')
  const c = inside.slice(0, last)

  const result = await require("../../interpreter.js")(c, d.msg, d.client, d.args, d.cmd, d.db)
  d.isError = true;
  return result
};
