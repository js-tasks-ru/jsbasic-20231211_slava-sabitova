function checkSpam(str) {
  str = str.toUpperCase();

  if (str.includes("XXX")) {
    return true;
  } else if (!str.includes("1xBet") & str.startsWith("1X")) {
    return true;
  } return false;
}



