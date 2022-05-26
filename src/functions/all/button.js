module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $button[button id:button text;...]!`
    );
  } else {
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
      
      if(!id || !display) {
        d.isError = true;
        return d.error(
          `❌ WhatscodeError: Usage: $button[button id:button text;...].`
        );
      }

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
  }
};
