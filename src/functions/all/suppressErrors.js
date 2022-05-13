module.exports = async(d) => {
  const split = d.code.split("$suppressErrors").length - 1;
  const after = d.code.split("$suppressErrors")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$suppressErrors[")[1].split("]")[0];

    if(!inside) {
      d.isError = true;
      return d.error(`❌ [whatscode.js] | Usage: $suppressErrors[error message]!`)
    } else {
      d.unique = true;
      return {
        type: "error",
        response: inside
      }
    }
  } else {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | Usage: $suppressErrors[error message]!`)
  }
};
