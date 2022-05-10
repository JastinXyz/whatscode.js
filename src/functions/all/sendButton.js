module.exports = async (d) => {
  const args = d.args.toString().split(",");
  const inside = d.code.split("$sendButton[")[1].split("]")[0];
  const [text, foot = "", id, dtext] = inside.split(";");

  if (!text || !id || !dtext)
    return d.client.sendMessage(
      `\`\`\`❌ [whatscode.js] | Usage: $sendButton[text;footer (optional);id;text].\`\`\``
    );

  const buttonMessage = {
    text: text,
    buttons: [{ buttonId: id, buttonText: { displayText: dtext }, type: 1 }],
    footer: foot,
    headerType: 1,
  };

  return JSON.stringify(buttonMessage);
};
