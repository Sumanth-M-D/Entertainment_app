export default function shuffleTwoArrays(array1, array2) {
  const result = [];

  // shuffle arrays altenatively
  for (let i = 0; i < array1.length - 1; i++) {
    let j = i * 2;
    result[j] = array1[i];
    result[j + 1] = array2[i];
  }
  return result;
}
