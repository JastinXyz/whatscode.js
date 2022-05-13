module.exports = async (d) => {
  var inside = d.code.split("$sendButton[")[1].split("]")[0];
  const [text, type] = inside.split(";");
 
if (!text) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $broadcast[text;type].`
    )
  }

  var allBroad = {
    text: text
   }
  return JSON.stringify(allBroad);
};
