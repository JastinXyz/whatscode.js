module.exports = async(d) => {
  const inside = d.inside;
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = new Date().getDay();

  if(!inside) {
    return days[day]
  } else {
    const [...n]  = inside.split(";");

    if(n.length < 7) {
      d.isError = true;
      d.error("❌ WhatscodeError: your $day field is < 7. Expected > 7. Received < 7")
    }

    return n[day]
  }
};
