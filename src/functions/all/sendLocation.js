module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $sendLocation[degrees Latitude;degrees Longitude;name (optional)]!`);
  } else {
    const [la, lo, name = ""] = inside.split(";");
    d.unique = true;
    return {
      type: "allInOne",
      response: { location: { degreesLatitude: la, degreesLongitude: lo, name }}
    }
  }
};
