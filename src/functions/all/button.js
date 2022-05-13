module.exports = async (d) => {
  const split = d.code.split("$button").length - 1;
  const after = d.code.split("$button")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$button[")[1].split("]")[0];
    const [...btn] = inside.split(";");

    if (!btn) {
      d.isError = true;
      return d.error(
        `❌ WhatscodeError: Usage: $button[button id:button text;...].`
      );
    }

    const buttons = [];

    for (let bttns of btn) {
      const [id, display] = bttns.split(":");
      buttons.push({
        buttonId: id,
        buttonText: { displayText: display },
        type: 1,
      });
    }

    d.unique = true;
    return {
      type: "buttons",
      response: buttons,
    };
  } else {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $button[button id:button text;...]!`
    );
  }
};
