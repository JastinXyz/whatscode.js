module.exports = async (d) => {
  const inside = d.code.split("$sendButton[")[1].split("]")[0];
   const [id, dtext] = inside.split(
    ";"
  );
  
  if(!id || !dtext) return d.client.sendMessage(`\`\`\`❌ [whatscode.js] | Usage: $sendButton[id;text].\`\`\``)
  
  return {buttonId: id, buttonText: {displayText: dtext}, type: 1};
};

/*const args = d.args.toString().split(",");

  const split = d.code.split("$sendbutton").length - 1;
  const after = d.code.split("$sendbutton")[split];

  if (after.startsWith("[")) {
    const id = d.code.split("$sendbutton[")[1].split("]")[0];
    const dtext = d.code.split("$sendbutton[")[2].split("]")[0];

    return {buttonId: id, buttonText: {displayText: dtext}, type: 1},;
  } else {
    console.log('You forgot to put "[" after declared $sendbutton') 
    return d.client.sendMessage(`\`\`\`❌ [whatscode.js] | You forgot to put "[" after declared $sendbutton.\`\`\``)
  }*/
