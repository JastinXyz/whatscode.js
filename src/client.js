const P = require("pino");
const {
  default: makeWASocket,
  DisconnectReason,
  useSingleFileAuthState,
  getContentType,
} = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");
const db = require("whatscode.db");

const { getWaWebVer, checkConnect, execInterpreterIfAnDollarInArray, checkQR } = require("./models/functions");
const { toLog } = require("./models/terminal");

module.exports = class Client {
  constructor(opts = {}) {
    if (!opts.name) throw new Error("[whatscode.js] name required!");

    if (typeof opts.prefix == "string") {
      opts.prefix = opts.prefix.split();
    }

    if (!opts.prefix) throw new Error("[whatscode.js] prefix required!");

    this.NAME = opts.name;
    this.PREFIX = opts.prefix;
    this.autoRead = opts.autoRead;
    this.customDatabase = opts.customDatabase;
    this.CMD = new Map();
    this.userJoin = new Map();
    this.userLeave = new Map();
    this.anotherMap = new Map();
    this.db = this.customDatabase;
    if(!this.customDatabase) this.db = db;

    this.printQRInTerminal = opts.printQRInTerminal;
    if(this.printQRInTerminal === undefined) this.printQRInTerminal = true

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

    require('axios').get('https://registry.npmjs.org/whatscode.js').then((x) => {
      let ver = require('../package.json').version;
      const latest = x.data['dist-tags'].latest
      if(latest !== ver) {
        toLog(3, undefined, `Latest whatscode.js version found: ${latest}! You can update it using <b>npm install whatscode.js@${latest}</b>`)
      }
    });
  }

  onConnectionUpdate(c) {
    this.whats.ev.on("connection.update", async (update) => {
      let qr;
      let self = this;
      checkQR(qr, update, function(con) {
        if(!self.printQRInTerminal) {
          if(c) {
            c(con)
          }
        }
      })

      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const reason = lastDisconnect.error
          ? new Boom(lastDisconnect)?.output.statusCode
          : 0;

        if (reason === DisconnectReason.loggedOut) {
          console.log(
            "Device Logged Out, Please Delete Session file and Scan Again."
          );
          process.exit();
        } else if (reason === DisconnectReason.badSession) {
          console.log(
            "\x1b[31mWhatscodeError 📕: \x1b[0mBad session file... Try deleting session file and rescan!\n\x1b[33mWhatscodeWarning 📙: \x1b[0mBUT IF YOU ARE LINKING THE BOTT WITH WAHSTAPP THEN WAIT FOR THIS RECONNECT PROCESS TO COMPLETE!\n\x1b[33mWhatscodeWarning 📙: \x1b[0mIF THIS ERROR STILL HAPPEN, TRY TO DO THE WAY ABOVE IE DELETE THE SESSION FILE AND RESCAN!\n\x1b[36mWhatscodeInfo 📘: \x1b[0mPrepare to Reconnect..."
          );
          console.log("\x1b[36mWhatscodeInfo 📘: \x1b[0mReconnecting...\n\n");

          try {
            const child = await require("child_process").spawn(
              process.argv.shift(),
              process.argv,
              {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
              }
            );

            setTimeout(() => {
              console.log(
                "\x1b[36mWhatscodeInfo 📘: \x1b[0mManual Restart Required!\n\n"
              );
              child.kill("SIGINT");
              process.exit(0);
            }, 5000);

            child.kill("SIGINT")
          } catch (err) {
            console.log(
              `\x1b[36mWhatscodeInfo 📘: \x1b[0mReconnecting Error: ${err}\n\n`
            );
          }
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log("Connection closed....");
        } else if (reason === DisconnectReason.connectionLost) {
          console.log("Connection Lost from Server...");
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log(
            "Connection Replaced, Another New Session Opened, Please Close Current Session First"
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
      if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			toLog(1, 0, "waiting for connection")
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			this.connect = true;
			toLog(2, `ready on client`, `${this.whats.user.verifiedName} || ${this.whats.user.id}`)
			toLog(2, `whatscode.js`, `Join our Discord at: https://discord.gg/CzqHbx7rdU`)
		}
    });
  }

  onCredsUpdate() {
    this.whats.ev.on("creds.update", this.saveState);
  }

  onMessage() {
    this.whats.ev.on("messages.upsert", async (m) => {
      this.PREFIX = await execInterpreterIfAnDollarInArray(this.PREFIX, this.db)
      this.m = m;

      if (this.autoRead) {
        this.whats.sendReadReceipt(
          m.messages[0].key.remoteJid,
          m.messages[0].key.participant,
          [m.messages[0].key.id]
        );
      }

      await require("./handler/commands")(
        m,
        this.whats,
        this.CMD,
        this.PREFIX,
        getContentType,
        this.db,
        this.anotherMap
      );
    });
  }

  command(...args) {
    for (const w of args) {
      if (!w.name) throw new Error("name required in commands!");
      if (!w.code) throw new Error("code required in commands!");

      this.CMD.set(w.name, w);
    }
  }

  variables(opt) {
    for (const [name, value] of Object.entries(opt)) {
      this.db.set(name, value);
    }
  }

  onUserJoin() {
    this.whats.ev.on("group-participants.update", async (u) => {
      if (u.action === "add") {
        await require("./handler/callbacks/userJoinCommand")(u, this);
      }
    });
  }

  onUserLeave() {
    this.whats.ev.on("group-participants.update", async (u) => {
      if (u.action === "remove") {
        await require("./handler/callbacks/userLeaveCommand.js")(u, this);
      }
    });
  }

  userJoinCommand(opt) {
    this.userJoin.set(this.userJoin.size, opt);
  }

  userLeaveCommand(opt) {
    this.userLeave.set(this.userLeave.size, opt);
  }

  readyCommand(opt) {
    if(!opt.jid) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"jid" is required in "readyCommand"')
    if(!opt.code) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"code" is required in "readyCommand"')

    var con;
    const self = this
    checkConnect(con, this, async function() {
      await require("./handler/callbacks/readyCommand")(opt, self)
    })

  }

  async intervalCommand(opt) {
    if(!opt.jid) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"jid" is required in "intervalCommand"')
    if(!opt.code) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"code" is required in "intervalCommand"')
    if(!opt.every) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"every" is required in "intervalCommand"')
    if(!opt.executeOnStartup) opt.executeOnStartup = false;

      const self = this
      if (opt.jid.includes("$")) {
        opt.jid = await require("./interpreter")(
          opt.jid,
          "",
          this.whats,
          "",
          this.CMD,
          this.db,
          "",
          true
        );
      }

      var con;
      checkConnect(con, self, async function() {
        var r = await require('./interpreter')(
            opt.code,
            "",
            self.whats,
            "",
            self.CMD,
            self.db,
            "",
            false,
            true
          );

        if(opt.executeOnStartup) {
          self.whats.sendMessage(opt.jid, r)
        }

        setInterval(function() {
          self.whats.sendMessage(opt.jid, r)
        }, opt.every)
      })
  }

  async status(opt) {
    if(!opt.status) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"status" is required in "status"')
    if(!opt.every) throw new Error('\x1b[31mWhatscodeError 📕: \x1b[0m"every" is required in "status"')

    const self = this
    if(typeof opt.status === "string") {
      opt.status = opt.status.split()
    }

    var arr = await execInterpreterIfAnDollarInArray(opt.status, this.db)

    var con;
    checkConnect(con, self, function() {
      var index = 0;
      setInterval(function() {
        self.whats.query({
          tag: "iq",
          attrs: {
            to: "@s.whatsapp.net",
            type: "set",
            xmlns: "status",
          },
          content: [
            {
              tag: "status",
              attrs: {},
              content: Buffer.from(arr[index++], "utf-8"),
            },
          ],
        });
          if (index == arr.length)
              index = 0

      }, opt.every);
    })
  }

};

require("./handler/prototype");
