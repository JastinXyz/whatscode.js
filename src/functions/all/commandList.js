module.exports = async(d) => {
  let inside = d.inside;
  inside? inside = Array.from(d.cmd.keys()).join(inside) : Array.from(d.cmd.keys()).join(", ")
  return inside;
};
