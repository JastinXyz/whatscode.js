# $createObject

Create a JSON object and later get it with `$getObjectProperty`.

### Usage:

```plain
$createObject[json object]
```

### Example:

```javascript
bot.command({
  name: "createobject",
  code: `
$getObjectProperty[hello] // return hi
$createObject[{"hello": "hi"}]`
})
```
