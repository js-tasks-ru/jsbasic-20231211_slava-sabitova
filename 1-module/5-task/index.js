function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = str.substr(0, maxlength - 1);
    return str += "…";
  } return str;
}
