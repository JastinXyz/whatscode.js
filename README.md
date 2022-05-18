# whatscode.js

**whatscode.js** is a package to create Whatsapp bots easily and quickly, even coding experience is not needed...

> We are also very open to those of you who want to contribute...

## Features
- Easy and fast to use.
- Short code.
- In this version has more than 55+ Functions ready to use and Still will continue to add more functions!

## Instalation

```bash
npm install whatscode.js
```

or install it from Github for more new features, some bug fixes, and mybe theres some bugs too.

```bash
npm i github:JastinXyz/whatscode.js
```

## Quick Starts

```js
const { Client } = require("whatscode.js");

// all Client options in the docs!
const bot = new Client({
  name: "Your bot name",
  prefix: "Your bot prefix",
});

// required callback (all callbacks available in the docs)
bot.onConnectionUpdate(); // connection update
bot.onCredsUpdate(); // credentials update
bot.onMessage(); // message update

// example ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`
});
```

## Callbacks
[Callbacks](https://whatscode.jstnlt.my.id/references/callbacks) can be used to run events, sort of logging and the like. There are several callbacks that are needed when creating a bot with **whatscode.js**. But there are still some other callbacks that you can use. You can find it in the [Docs](https://whatscode.jstnlt.my.id)!

```js
// here are examples of callbacks for user join and user leave.
// it can be used like Welcomer or Goodbye.

// callback
bot.onUserJoin()
bot.onUserLeave()

// code breakdown is in the docs...
// This command will run when someone joins the group
bot.userJoinCommand({
  groupJid: '123@g.us',
  code: `hello {user}, welcome to {group}`
})

// This will run when a user leaves the group.
bot.userLeaveCommand({
  groupJid: '123@g.us',
  code: `goodbye {user} from {group}`
})
```

## Variables
[Variables](https://whatscode.jstnlt.my.id/references/guides/variables) can be used to store data, you can also use this for like system economics, leveling and others.

```js
bot.variables({
  name: "value",
  name2: "value2"
})
```

## Contributors
<a href="https://github.com/JastinXyz/whatscode.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JastinXyz/whatscode.js" />
</a>

## Links
- Documentation: https://whatscode.jstnlt.my.id
- Discord Server: https://discord.gg/CzqHbx7rdU
