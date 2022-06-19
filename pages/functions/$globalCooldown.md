# $globalCooldown

Give time lag to people who use the command. This can be used to avoid spam. Duration options must use like \`1s\`.

- s - seconds
- m - minutes
- h - hour
- d - day
- M - month
- y - year


### Usage:

```plain
$globalCooldown[duration;error]

Error Breakdown:
  %time% - the remaining time
```

### Example:

```javascript
bot.command({
  name: "globalcooldown",
  code: `hello $senderPushName
  $globalCooldown[10s;wait %time% to use this command again.]`
})
```
