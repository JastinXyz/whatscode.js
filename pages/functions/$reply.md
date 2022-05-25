# $reply

Send a message with the reply (quoted message)

### Usage:

```plain
$reply[text to reply]
```

or just put the `$reply`

```javascript
bot.command({
  name: "replyme",
  code: `Hello!
$reply`
})
```
