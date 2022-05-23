module.exports = async (d) => {
  const inside = d.inside;
  var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))|" +
      "localhost" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $isURL[some text]!`);
  } else {
    try {
      var re = inside.trim() === "" ? false : pattern.test(inside);
    } catch (err) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Something error on $isURL!`
      );
    }

    return re;
  }
};
