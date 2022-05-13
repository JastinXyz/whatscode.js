module.exports = async (d) => {
  // const r = d.command.code.split("$reply").length
  // if (r >= 3) return d.client.sendMessage(`\`\`\`❌ WhatscodeError: Can't use more than one $reply.\`\`\``)

  const r = d.code.split("$reply").length - 1;
  var inside = d.code.split("$reply[")[r];

  if (!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $reply[text to reply]!`);
  } else {
    inside = inside.split("]")[0];
    return inside;
  }
};
