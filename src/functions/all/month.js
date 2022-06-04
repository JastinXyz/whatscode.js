module.exports = async(d) => {
  const inside = d.inside;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']
  const month = new Date().getMonth();

  if(!inside) {
    return months[month]
  } else {
    const [...n]  = inside.split(";");

    if(n.length < 12) {
      d.isError = true;
      d.error("❌ WhatscodeError: your $month field is < 12. Expected >= 12. Received < 12")
    }

    return n[month]
  }
};
