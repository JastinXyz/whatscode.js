# whatscode.js

**whatscode.js** is a package to create Whatsapp bots easily and quickly, even coding experience is not needed...

> We are also very open to those of you who want to contribute...

## Features
- Easy and fast to use.
- Short code.
- Currently has more than 40+ Functions ready to use and Still will continue to add more functions!

## Instalation

```bash
npm install whatscode.js
```

or install it from Github for more features, some bug fixes, and mybe theres some bugs too.

```bash
npm i github:JastinXyz/whatscode.js
```

## Quick Starts

```js
const { Client } = require("whatscode.js");

// all Client options in docs!
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

## Contributors
<a href="https://github.com/JastinXyz/whatscode.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JastinXyz/whatscode.js" />
</a>

## Links
- Documentation: https://whatscode.jstnlt.my.id
- Discord Server: https://discord.gg/CzqHbx7rdU
