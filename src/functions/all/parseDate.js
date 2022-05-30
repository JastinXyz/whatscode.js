module.exports = async(d) => {
  const inside = d.inside;
  if(!inside) {
    d.isError = true;
    return d.error(`❌ WhatscodeError: Usage: $parseDate[ms;time/date]`)
  } else {
    var [ms, n] = inside.split(";");
    ms = Number(ms);
    var seconds = Math.floor(ms / 1000),
        minutes = Math.floor(seconds / 60),
        hours   = Math.floor(minutes / 60),
        days    = Math.floor(hours / 24),
        months  = Math.floor(days / 30),
        years   = Math.floor(days / 365);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 30;
    months %= 12;
    return n === "date"? new Date(ms).toLocaleString("en-US") : `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
  }
};
