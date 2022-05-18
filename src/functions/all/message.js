module.exports = async (d) => {
  const args = d.args.join(" ");

  const split = d.code.split("$message").length - 1;
  const after = d.code.split("$message")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$message[")[1].split("]")[0];

    return args[inside - 1]? args[inside - 1] : "";
  } else {
    return args? args : "";
  }
};
