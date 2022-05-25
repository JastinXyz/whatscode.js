# $kick

Kick someone from group...

### Usage:

```plain
$kick[jid (optional)]
```

### Example:

```javascript
bot.command({
  name: "kick",
  code: `$kick[$mentioned[1;yes]]
$onlyIf[$isAdmin!=false;bot must be an admin!]
$onlyIf[$isAdmin[$decodeJid[$sender]]!=false;you must be an admin first lol]
$onlyIf[$mentioned[1;yes]!=;mention some user!]`
})
```
