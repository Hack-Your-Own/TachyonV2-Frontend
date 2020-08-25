// Util functions for parsing server data

/**
 *
 * @param {String} name
 */
const makeTitleReadable = (name) => {
  if (name === "_id") return "Id";
  if (name === "track") return "Completed Learner Track";
  return name
    .split("_")
    .map((word) => {
      if (word) return word[0].toUpperCase() + word.substring(1);
      return "";
    })
    .join(" ");
};

/**
 * @param {String} isoString
 */
const parseISODates = (isoString) => {
  if (!isoString) {
    return "";
  }
  return new Date(isoString).toLocaleDateString("en-US");
};

/**
 * @param {Object} obj
 * @param {string[]} keyOrder
 */
const orderKey = (obj, keyOrder) => {
  keyOrder.forEach((k) => {
    let v = obj[k]; /* eslint no-param-reassign: "error" */
    // eslint-disable-next-line
    delete obj[k];
    // eslint-disable-next-line
    if (k.endsWith("date") || k.endsWith("At")) {
      v = parseISODates(v);
    }
    if (k === "interest_skills" || k === "lang_prefs") {
      v = v.length === 0 ? "null" : v.join(", ");
    }
    obj[k] = v;
  });
};

export { makeTitleReadable, orderKey, parseISODates };
