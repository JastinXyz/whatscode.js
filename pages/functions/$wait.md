# $wait

Wait <milliseconds> to execute next code.

### Usage:

```plain
$wait[milliseconds]
```

### Example:

```javascript
bot.command({
    name: "waitgobrrr",
    code: `
$send[this is new message;$remoteJid]
$wait[3000]
$send[wait 3 seconds for new message;$remoteJid]`
})
```
