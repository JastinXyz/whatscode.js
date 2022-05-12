module.exports = async (d) => {
  const args = d.args.toString().split(",");
  const inside = d.code.split("$sendButton[")[1].split("]")[0];
  const [text, foot = "", ...btn] = inside.split(";");

  if (!text || !btn)
    return d.client.sendMessage(
      `\`\`\`❌ [whatscode.js] | Usage: $sendButton[text;footer (optional);buttonId:buttonText;buttonId:buttonText;...].\`\`\``
    );

    const buttons = []

    for (let bttns of btn) {
      const [id, display] = bttns.split(":");
      buttons.push({
        buttonId: id,
        buttonText: { displayText: display },
        type: 1
      })
    }

  const buttonMessage = {
    text: text,
    buttons: buttons,
    footer: foot,
    headerType: 1,
  };

 return JSON.stringify(buttonMessage);
};
