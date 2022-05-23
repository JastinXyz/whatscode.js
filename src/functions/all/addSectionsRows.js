module.exports = async (d) => {
  const inside = d.inside;
  if (!inside) {
    d.isError = true;
    return d.error(
      `❌ WhatscodeError: Usage: $addSectionsRows[sectionsTitle;rowTitle:rowId:description;rowTitle:rowId:description;...]!\n- Optional description.`
    );
  } else {
    const [sectionTitle, ...s] = inside.split(";");
    const findIndex = d.sections.findIndex(x => x.title === sectionTitle)

    if(!d.sections[findIndex]) {
      d.isError = true;
      return d.error(`❌ WhatscodeError: invalid sections title in $addSectionsRows[${inside}]`)
    }

    for (let n of s) {
      const [title, rowId, description = ""] = n.split(":");
      d.sections[findIndex].rows.push({title, rowId, description})
    }
    return ""
  }
};
