function getMinMax(str) {
  let nums = str.split(' ').filter(item => isFinite(item));
  return {
    min: Math.min(...nums),
    max: Math.max(...nums)
  };
}
