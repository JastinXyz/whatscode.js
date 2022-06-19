# $cooldown

Give time lag to people who use the command in chat. This can be used to avoid spam. Time options must use like \`1s\`.

- s - seconds
- m - minutes
- h - hour
- d - day
- M - month
- y - year


### Usage:

```plain
$cooldown[duration;error]

Error Breakdown:
  %time% - the remaining time
```

### Example:

```javascript
bot.command({
  name: "cooldown",
  code: `hello $senderPushName
  $cooldown[10s;wait %time% to use this command again.]`
})
```
