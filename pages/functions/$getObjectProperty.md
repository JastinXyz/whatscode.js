# $getObjectProperty

To get the value of the json that has been created use `$createObject`.

### Usage:

```plain
$getObjectProperty[name]
```

### Example:

```javascript
bot.command({
  name: "getobject",
  code: `
$getObjectProperty[hello] // return hi
$createObject[{"hello": "hi"}]`
})
```
