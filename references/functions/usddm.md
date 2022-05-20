# $dm

All code results will be sent to the dm/private message of the person with the JID provided.

{% hint style="success" %}
**you can put $dm anywhere in the code (no need above or below because if there is $dm then all code results will be sent to the dm person jid)**
{% endhint %}

### Usage:

```
$dm[user jid (optional)]
```

### Example:

```javascript
bot.command({
    name: "dm",
    code: `
Hello world
$dm[xyz@s.whatsapp.net]`
})
```

```javascript
bot.command({
    name: "dmMe",
    code: `
Hello $senderPushName
$dm`
})
```
