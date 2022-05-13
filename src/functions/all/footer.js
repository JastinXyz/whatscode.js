module.exports = async (d) => {
  const split = d.code.split("$footer").length - 1;
  const after = d.code.split("$footer")[split];

  if (after.startsWith("[")) {
    var inside = d.code.split("$footer[")[1].split("]")[0];

    if (!inside) {
      d.isError = true;
      return d.error(`❌ [whatscode.js] | Usage: $footer[text].`);
    }

    d.unique = true;
    return {
      type: "footer",
      response: inside,
    };
  } else {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | Usage: $footer[text]!`);
  }
};
