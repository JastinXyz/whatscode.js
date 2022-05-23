module.exports = async(d) => {
  let inside = d.inside;
  if(!inside) {
    d.isError = true;
    d.error('❌ WhatscodeError: Usage: $createObject[json object]')
  } else {
    try {
      inside = JSON.parse(inside)
    } catch (err) {
      d.isError = true;
      d.error('❌ WhatscodeError: Something error in $createObject: ' + err)
    }

    d.data.createObject = inside
    return ""
  }
};
