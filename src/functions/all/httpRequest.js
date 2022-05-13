const axios = require("axios");
const _s = require("scramb");

// not tested yet with other method...
module.exports = async (d) => {
  const inside = d.code.split("$httpRequest[")[1].split("]")[0];
  const [url, method = "GET", body, proper, ...insideHeaders] = inside.split(
    ";"
  );
  const headers = {
    "User-Agent": _s.userAgents().result,
  };

  if (!url) {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | url required in $httpRequest!`);
  }

  for (let head of insideHeaders) {
    const [headName, ...headValue] = head.split(":");
    headers[headName] = headValue.join(":");
  }

  let da = await axios(url, {
    method: method,
    headers: headers,
    data: body,
  }).catch((err) => {
    d.isError = true;
    return d.error(`❌ [whatscode.js] | Cannot interact with url. ERR: ${err}`);
  });

  var res = da.data;
  var result = proper ? res[proper] : res;
  return JSON.stringify(result);
};
