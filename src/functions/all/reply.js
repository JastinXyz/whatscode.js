module.exports = async (d) => {
  let inside = d.inside;
  inside? inside = inside : inside = ""
  return inside;
};
