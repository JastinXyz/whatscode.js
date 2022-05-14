---
description: There are 2 types of global variables, Global and Global user.
---

# Global Variables

{% hint style="warning" %}
Make sure you already have a variable added in `bot.variables`like [.](./ "mention")
{% endhint %}

## Global

Value will be the same for everyone in any group.

#### Set:

```
$setVar[name;value]
```

#### Get:

```
$getVar[name]
```

### Global user

Value will be assigned to users globally everywhere.

#### Set:

```
$setGlobalUserVar[name;value;user jid (optional)
```

#### Get:

```
$getGlobalUserVar[name;user jid (optional)]
```
