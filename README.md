# whatscode.js

**whatscode.js** is a package to create Whatsapp bots easily and quickly, even coding experience is not needed...

> You should know that whatscode.js is still in the testing stage and whatscode.js is a new project that was created a few days ago... So maybe there are still many bugs happening, Please report bugs or if you want to give suggestions open an issue in our Github Repository!

> We are also very open to those of you who want to contribute...

## Instalation

```bash
npm install whatscode.js
```

or install it from Github from more features and mybe theres some bugs too.

```bash
npm i github:JastinXyz/whatscode.js
```

## Quick Starts

```js
const { Client } = require("whatscode.js");

const bot = new Client({
  name: "Your bot name",
  prefix: "Your bot prefix",
});

// required callback
bot.onConnectionUpdate(); // connection update
bot.onCredsUpdate(); // credentials update
bot.onMessage(); // message update

// ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`
});
```

## Links
- Documentation: https://whatscode.jstnlt.my.id
- Discord Server: https://discord.gg/CzqHbx7rdU
