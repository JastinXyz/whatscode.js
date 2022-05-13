const P = require("pino");
const {
  default: makeWASocket,
  DisconnectReason,
  AnyMessageContent,
  delay,
  proto,
  jidDecode,
  useSingleFileAuthState,
  getContentType,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  downloadContentFromMessage,
  generateMessageID,
  makeInMemoryStore,
} = require("@adiwajshing/baileys");
const baileys = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");
const axios = require("axios");

const { getWaWebVer } = require("./models/functions.js");

module.exports = class Client {
  constructor(opts = {}) {
    if (!opts.name) throw new Error("[whatscode.js] name required!");
    if (!opts.prefix) throw new Error("[whatscode.js] prefix required!");

    this.NAME = opts.name;
    this.PREFIX = opts.prefix;
    this.autoRead = opts.autoRead;
    this.CMD = new Map();

    this.printQRInTerminal = opts.printQRInTerminal;
    if (!this.printQRInTerminal) this.printQRInTerminal = true;

    this.AUTH_FILE = opts.authFile;
    if (!this.AUTH_FILE) this.AUTH_FILE = "./state.json";
    const { state, loadState, saveState } = useSingleFileAuthState(
      this.AUTH_FILE
    );
    this.state = state;
    this.loadState = loadState;
    this.saveState = saveState;

    this.whats = makeWASocket({
      logger: P({ level: "fatal" }),
      printQRInTerminal: this.printQRInTerminal,
      auth: this.state,
      browser: [this.NAME, "Safari", "1.0.0"],
      version: getWaWebVer() || [2, 2214, 12],
    });
  }
  onConnectionUpdate() {
    this.whats.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        let reason = lastDisconnect.error
          ? new Boom(lastDisconnect)?.output.statusCode
          : 0;
        if (reason === DisconnectReason.badSession) {
          console.log(`Bad Session File, Please Delete Session and Scan Again or try restart again.`);
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
        } else if (reason === DisconnectReason.connectionLost) {
          console.log(
            "Connection Lost from Server, reconnecting..."
          );
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log(
            "Connection Replaced, Another New Session Opened, Please Close Current Session First"
          );
          process.exit();
        } else if (reason === DisconnectReason.loggedOut) {
          console.log(
            `Device Logged Out, Please Delete Session and Scan Again.`
          );
          process.exit();
        } else if (reason === DisconnectReason.restartRequired) {
          console.log("Restart Required!");
        } else if (reason === DisconnectReason.timedOut) {
          console.log("Connection TimedOut...");
        } else {
          console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        }
      }
      console.log("[conn logs]", update);
      if(update.receivedPendingNotifications) {
        console.log("[whatscode.js] Your bot is ready now!\n[whatscode.js] Join our Discord at: https://discord.gg/CzqHbx7rdU")
      }
    });
  }
  onCredsUpdate() {
    this.whats.ev.on("creds.update", this.saveState);
  }
  onMessage() {
    this.whats.ev.on("messages.upsert", async (m) => {
      if(this.autoRead) {
        this.whats.sendReadReceipt(m.messages[0].key.remoteJid, m.messages[0].key.participant, [m.messages[0].key.id]);
      }

      await require("./handler/commands.js")(
        m,
        this.whats,
        this.CMD,
        this.PREFIX,
        getContentType
      );
    });
  }
  command(...args) {
    for (const w of args) {
      if (!w.name) throw new Error(`name required in commands!`);
      if (!w.code) throw new Error(`code required in commands!`);

      this.CMD.set(w.name.toLowerCase(), w.code);
    }
  }
};

String.prototype.replaceLast = function (find, replace) {
  if(typeof replace === "object") {
    replace = ""
  }

  var index = this.lastIndexOf(find);

  if (index >= 0) {
    return (
      this.substring(0, index) + replace + this.substring(index + find.length)
    );
  }

  return this.toString();
};
