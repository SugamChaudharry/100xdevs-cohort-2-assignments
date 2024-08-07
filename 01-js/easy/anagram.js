/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
// [9,8,7,6,5,4,3,2,1]
// [8,9]
function merge(lArr, rArr) {
  let res = new Array(lArr.length + rArr.length);
  let i = 0;
  let j = 0;
  let k = 0;
  let lLen = lArr.length;
  let rLen = rArr.length;
  while (lLen && rLen) {
    if (lArr[i] < rArr[j]) {
      res[k] = lArr[i];
      k++;
      i++;
      lLen--;
    } else {
      res[k] = rArr[j];
      k++;
      j++;
      rLen--;
    }
  }
  while (lLen) {
    res[k] = lArr[i];
    k++;
    i++;
    lLen--;
  }
  while (rLen) {
    res[k] = rArr[j];
    k++;
    j++;
    rLen--;
  }
  return res;
}
function meargeSort(arr) {
  if (arr.length === 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let lArr = meargeSort(arr.slice(0, mid));
  let rArr = meargeSort(arr.slice(mid));
  return merge(lArr, rArr);
}

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  if (str1.length === 0 || str2.length === 0) return true
  if (str1.length !== str2.length) return false;
  let arr1 = new Array(str1.length);
  let arr2 = new Array(str1.length);
  for (let i = 0; i < str1.length; i++) {
    arr1[i] = str1[i];
    arr2[i] = str2[i];
  }
  arr1 = meargeSort(arr1);
  arr2 = meargeSort(arr2);
  console.log(arr1,arr2);
  for (let i = 0; i <= arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
console.log(isAnagram('Debit Card', 'Bad Credit'));
module.exports = isAnagram;
