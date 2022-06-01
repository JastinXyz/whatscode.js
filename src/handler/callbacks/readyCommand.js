module.exports = async(opt, d) => {
  if (opt.jid.includes("$")) {
    opt.jid = await require("../../interpreter")(
      opt.jid,
      "",
      d.whats,
      "",
      d.CMD,
      d.db,
      "",
      true
    );
  }

  const a = await require("../../interpreter")(
      opt.code,
      "",
      d.whats,
      "",
      d.CMD,
      d.db,
      "",
      false,
      true
    );

    a.text.trim() === ""
      ? undefined
      : d.whats.sendMessage(opt.jid, a)
};
