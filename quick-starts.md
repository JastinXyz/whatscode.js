# Quick Starts

```js
const { Client } = require('whatscode.js')
const bot = new Client({
  name: "your bot name",
  prefix: "your bot prefix",
})

// required callbacks
bot.onConnectionUpdate() // connection update
bot.onCredsUpdate() // credentials update
bot.onMessage() // message update

// ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`,
})
```
