export function URLregex() {
  let urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  return urlRegex;
}

export function numberValidate(value) {
  return value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
}

export function CharRegex() {
  let charRegex = /^[A-Za-z ]*$/;
  return charRegex;
}

export function gstregex() {
  let regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex;
}

export function NoSpecialChar() {
  let noChar = /^[A-Za-z0-9 ]*$/;
  return noChar;
}

export function Numeric() {
  let numeric = /^[0-9.]*$/;
  return numeric;
}
