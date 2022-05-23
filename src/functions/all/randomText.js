module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $randomText[text 1;text 2;text 3;...]`
    );
  } else {
    const [...text] = inside.split(";");

    if (!text) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $randomText[text 1;text 2;text 3;...]!`
      );
    } else {
      return text[Math.floor(Math.random() * text.length)];
    }
  }
};
