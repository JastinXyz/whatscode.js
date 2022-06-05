<div align="center">
<img src="https://whatscode.js.org/assets/img/gambar.png" alt="whatscode.js logo" height="100"/>
<br/>
<p style="margin:0 45px 0 45px;"><strong>whatscode.js</strong> is a package to create Whatsapp bots easily and quickly, even coding experience is not really needed...<br/>For further documentation you can visit <a href="https://whatscode.jstnlt.my.id" target="_blank">https://whatscode.jstnlt.my.id</a></p>
<a href="https://npmjs.com/package/whatscode.js" target="_blank">
<img alt="npm" src="https://img.shields.io/npm/dt/whatscode.js?logo=npm&style=for-the-badge">
</a>

<a href="https://discord.gg/CzqHbx7rdU" target="_blank">
<img alt="Discord" src="https://img.shields.io/discord/973324613851422730?color=%235865F2&label=Discord&logo=discord&style=for-the-badge">
</a>
</div>

> We are also very open to those of you who want to contribute...

## Features
- Easy and fast to use.
- Short code.
- In this version has more than **110 Functions** ready to use and Still will continue to add more functions!

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

// required callbacks (all callbacks available in the docs)
bot.onConnectionUpdate();
bot.onCredsUpdate();
bot.onMessage();

// example ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`
});
```

## Callbacks
[Callbacks](https://whatscode.jstnlt.my.id/callbacks/onconnectionupdate) can be used to run events, sort of logging and the like. There are several callbacks that are needed when creating a bot with **whatscode.js**. But there are still some other callbacks that you can use. You can find it in the [Docs](https://whatscode.jstnlt.my.id)!

Here are examples of callbacks for user join and user leave. It can be used like Welcomer or Goodbye.

```js
// callbacks
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

## Advanced

- [Buttons](https://whatscode.jstnlt.my.id/functions/$button) - Add a button to the message. (text required)
  ```
  $button[buttonId:button text;...]
  ```

- [Sticker](https://whatscode.jstnlt.my.id/functions/$sendSticker) - Send a sticker.
  ```
  $sendSticker[image path;pack name;author name]
  ```

- [Template Buttons](https://whatscode.jstnlt.my.id/functions/$templateButtons) - This function is useful for buttons that have an action such as going to a regular url, call, or quick reply. (text required)
  ```
  $templateButtons[(url/call/quickReply):display Text:value;...]
  ```

- [Sections](https://whatscode.jstnlt.my.id/guides/sections) - Messages with sections are messages that contain a list in them. Like buttons and the like but this is a list. (text required)
  ```
  $addSectionsRows[title;rowTitle:rowId:rowDescription]
  $addSectionsDisplayText[some text]
  $addSections[title]
  ```

- [Command React](https://whatscode.jstnlt.my.id/functions/$commandReact) - Will add a reaction to the command message.
  ```
  $commandReact[🤨️]
  ```

- [AND MANY MORE](https://whatscode.jstnlt.my.id/)

## Contributors
<a href="https://github.com/jastinxyz/whatscode.js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jastinxyz/whatscode.js" />
</a>

## Links
- [Documentation](https://whatscode.jstnlt.my.id)
- [Discord Server](https://discord.gg/CzqHbx7rdU)
- [Github](https://github.com/JastinXyz/whatscode.hs)
