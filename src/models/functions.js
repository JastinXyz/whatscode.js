const searched = [];
const axios = require('axios');

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
};
