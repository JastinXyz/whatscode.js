const searched = [];
const axios = require("axios");
const { jidDecode } = require("@adiwajshing/baileys");
module.exports = {
  searchFunc: function searchFunc(_n, _p) {
    for (const f of _n) {
      const func = _p.filter((filt) => filt == ("$" + f).slice(0, filt.length));

      if (func.length == 1) {
        searched.push(func[0]);
      } else if (func.length > 1) {
        searched.push(func.sort((a, b) => b.length - a.length)[0]);
      }
    }

    return searched;
  },
  getWaWebVer: function getWaWebVer() {
    let version;
    try {
      let { data } = axios.get(
        "https://web.whatsapp.com/check-update?version=1&platform=web"
      );
      version = [data.currentVersion.replace(/[.]/g, ", ")];
    } catch {
      version = [2, 2214, 12];
    }
    return version;
  },
  decodeJid: function decodeJid(jid) {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  },
  runtime: function runtime(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "0 day, ";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "0 hour, ";
    var mDisplay =
      m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "0 minute, ";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "0 second ";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  },
  sender: function sender(d) {
    return d.msg.key.fromMe
      ? d.client.user.jid
      : d.msg.participant
      ? d.msg.participant
      : d.msg.key.participant
      ? d.msg.key.participant
      : d.msg.key.remoteJid;
  },
  array_move: function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
  }
};
