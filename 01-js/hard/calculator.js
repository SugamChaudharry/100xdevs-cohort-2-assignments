/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note:
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(result = 0){
    this.result = result
  }
  // add: takes a number and adds it to the result
  add(n){
    return n+this.result
  }
  // subtract: takes a number and subtracts it from the result
  subtract(n){
    return n-this.result
  }
  // - multiply: takes a number and multiply it to the result
  multiply(n){
    return n*this.result
  }
  // - divide: takes a number and divide it to the result
  divide(n){
    return n/this.result
  }
  // - clear: makes the `result` variable to 0
  clear(){
    this.result = 0
  }
  // - getResult: returns the value of `result` variable
  getResult(){
    console.log(this.result);
  }
  // - calculate: takes a string expression which can take multi-arithmetic operations and give its result
  calculate(str = ''){
    // removing spaces
    let newStr = ''
    for(let i = 0 ; i < str.length; i++){
      if (str[i] !== " "){
        newStr += str[i]
      }
    }
    // creating array of values which might have suArray
    str = newStr
    newStr = []
    function subArray(str,i,dividePoint,fn=null){
      i++
      let subArr = []
      let k = 0
      while(str[i] !== dividePoint[0]){
        if (str[i] !== dividePoint[1]){
          subArr[k] = str[i];
          k++
          i++
        }else{
          [subArr[k], i] = subArray(str,i);
          k++
          i++
        }
      }
      const fnReturn = fn(subArr)
      const returnValue = fnReturn === null ? subArr : fnReturn
      return [returnValue,i]
    }
    for(let i = 0, j = 0; i < str.length; i++){
      if (str[i] !== '('){
        newStr[j] = str[i];
        j++
      }else{
        [newStr[j],i,['(',')']] = subArray(str,i)
        j++;
      }
    }
    function simplifying(arr){//[2,*,3,+,5] ==> [[2,*,3],[3,+,5]]
      const res = [];
      let check = [0,0];
      let subArr = []
      for (let i = 0, j=0; i < arr.length; i++) {
        if (Number(arr[i])){
          if (check[0] === 0){
            subArr[j] = arr[i];
          }else{
            subArr[j] = subArr[j] * 10 + arr[i];
          }
          check[0]++
        }else{
          if (check[1] === 0){
            j++;
            subArr[j] = arr[i];
            check[1]++
            check[0] = 0
            j++;
          }else{
            res.push(subArr);
            subArr = [res[res.length -1][2]]
            j = 1
            subArr[j] = arr[i]
            j++
            check[1] = 0
            check[0] = 0
          }
        }
    }
        res.push(subArr);
      return res
    }
    function calc(strArr) {

    }
    const res = subArray(newStr,0,['[',']'],calc)

  }
}
const clc = new Calculator()
console.log(clc.calculate(`10 +   2 *    (   6 - (4 + 1) / 2) + 7`));
// [10, +, 2, [6, -, [4,+,1],/,2],+,7]

module.exports = Calculator;
