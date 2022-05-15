# Quick Starts

{% hint style="info" %}
**Please note:** That **whatscode.js** functions code runs from the ground up.

Need help? Join our Discord at: [https://discord.gg/CzqHbx7rdU](https://discord.gg/CzqHbx7rdU)
{% endhint %}

## Install the library

First of all, install **whatscode.js** library:

{% tabs %}
{% tab title="Bash" %}
```bash
# Install via npm
npm install whatscode.js

# or install it from Github for more new features, some bug fixes, and mybe theres some bugs too.
npm i github:JastinXyz/whatscode.js
```
{% endtab %}
{% endtabs %}

## Make your first simple bot

Create your first bot using **whatscode.js** with just a few lines:

{% tabs %}
{% tab title="Node.js" %}
```javascript
const { Client } = require("whatscode.js");

const bot = new Client({
  name: "Your bot name",
  prefix: "Your bot prefix",
});

// required callback
bot.onConnectionUpdate(); // connection update
bot.onCredsUpdate(); // credentials update
bot.onMessage(); // message update

// example ping command
bot.command({
  name: "ping",
  code: `🏓 | $ping ms`
});
```
{% endtab %}
{% endtabs %}

## Callbacks

[Callbacks](references/callbacks/) can be used to run events, sort of logging and the like. There are several callbacks that are needed when creating a bot with **whatscode.js**. But there are still some other callbacks that you can use.

{% tabs %}
{% tab title="Node.js" %}
```javascript
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
{% endtab %}
{% endtabs %}

## Variables

[Variables](references/guides/variables/) can be used to store data, you can also use this for like system economics, leveling and others.

{% tabs %}
{% tab title="Node.js" %}
```javascript
bot.variables({
  name: "value",
  name2: "value2"
})
```
{% endtab %}
{% endtabs %}

## Links

* Documentation: [https://whatscode.jstnlt.my.id](https://whatscode.jstnlt.my.id)
* Discord Server: [https://discord.gg/CzqHbx7rdU](https://discord.gg/CzqHbx7rdU)
