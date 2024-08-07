/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str = '') {
  let f = 0;
  const regex = /^[a-zA-Z]+$/;
  str = str.replace(" ", "").replace(/[^a-zA-Z]/g, "").toLowerCase()
  for(let i = 0; i < Math.floor(str.length/2); i++){
    if (regex.test(str[i]) ||  regex.test(str[str.length - i-1])){
      if(str[i] !== str[str.length - i-1]){
        f = 1
      }
    }
  }
  return f === 0?true:false;
}

module.exports = isPalindrome;
