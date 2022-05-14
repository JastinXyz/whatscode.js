---
description: This callback will listen to people who leave the group.
---

# onUserLeave

{% hint style="info" %}
You can put this callback under other callbacks.

```javascript
bot.onUserLeave()
```
{% endhint %}

### Command:

This command will run when someone leaves the group. The `onUserLeave` callback is also required if you enable `userLeaveCommand`.

```javascript
bot.userLeaveCommand({
  groupJid: 'group jid', // you can use the get variables here
  code: `code`
})
```

### Code Breakdown:

* `{userJid}` - The user JID.
* `{groupJid}` - The group JID.
* `{user}` - Mentions the user.
* `{group}` - Group name.
* And you can use other **whatscode.js** functions.

### Example:

```javascript
bot.userJoinCommand({
  groupJid: '123@g.us',
  code: `Goodbye {user} from {group}`
})
```
