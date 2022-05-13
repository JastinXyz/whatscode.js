module.exports = async (d) => {
  const split = d.code.split("$image").length - 1;
  const after = d.code.split("$image")[split];

  if (after.startsWith("[")) {
    var inside = d.code.split("$image[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ [whatscode.js] | Usage: $image[image url].`);
    }

    d.unique = true;
    return {
      type: "image",
      response: inside,
    };
  } else {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | Usage: $image[url]!`);
  }
};
