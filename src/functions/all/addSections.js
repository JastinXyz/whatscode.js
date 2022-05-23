module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $addSections[title]!`
    );
  } else {
    d.sections.push({
      title: inside,
      rows: []
    })
    return ""
  }
};
