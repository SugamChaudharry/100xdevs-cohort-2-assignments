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
  constructor(result = 0) {
    this.result = result;
  }
  // add: takes a number and adds it to the result
  add(n) {
    return n + this.result;
  }
  // subtract: takes a number and subtracts it from the result
  subtract(n) {
    return n - this.result;
  }
  // - multiply: takes a number and multiply it to the result
  multiply(n) {
    return n * this.result;
  }
  // - divide: takes a number and divide it to the result
  divide(n) {
    return n / this.result;
  }
  // - clear: makes the `result` variable to 0
  clear() {
    this.result = 0;
  }
  // - getResult: returns the value of `result` variable
  getResult() {
    console.log(this.result);
  }
  // - calculate: takes a string expression which can take multi-arithmetic operations and give its result
  calculate(str = "") {
    // removing spaces
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== " ") {
        newStr += str[i];
      }
    }
    // creating array of values which might have suArray
    str = newStr;
    newStr = [];
    function subArray(str, i, fn) {
      i++;
      let subArr = [];
      let k = 0;
      while (str[i] !== ")") {
        if (str[i] !== "(") {
          subArr[k] = str[i];
          k++;
          i++;
        } else {
          [subArr[k], i] = subArray(str, i, fn);
          k++;
          i++;
        }
      }
      const returnValue = fn(subArr);
      return [returnValue, i];
    }
    //[2,*,3,+,5] ==> [[2,*,3],[3,+,5]]
    function simplifying(arr) {
      const res = [];
      let check = [0, 0];
      let subArr = [];
      for (let i = 0, j = 0; i < arr.length; i++) {
        if (Number(arr[i]) || Number(arr[i]) === 0) {
          if (check[0] === 0) {
            subArr[j] = Number(arr[i]);
          } else {
            subArr[j] = subArr[j] * 10 + Number(arr[i]);
          }
          check[0]++;
        } else {
          if (check[1] === 0) {
            j++;
            subArr[j] = arr[i];
            check[1]++;
            check[0] = 0;
            j++;
          } else {
            res.push(subArr);
            subArr = [res[res.length - 1][2]];
            j = 1;
            subArr[j] = arr[i];
            j++;
            check[1] = 1;
            check[0] = 0;
          }
        }
      }
      res.push(subArr);

      return calc(res);
    }
    function calc(arr) {
      function doCalculation(arr) {
        let res = 0;
        if (arr[1] === "+") {
          res = Number(arr[0]) + Number(arr[2]);
        } else if (arr[1] === "-") {
          res = Number(arr[0]) - Number(arr[2]);
        } else if (arr[1] === "*") {
          res = Number(arr[0]) * Number(arr[2]);
        } else if (arr[1] === "/") {
          res = Number(arr[0]) / Number(arr[2]);
        }
        return res;
      }

      if (arr.length === 1) {
        return doCalculation(arr[0]);
      } else if (arr.length === 2) {
        switch (arr[0][1]) {
          case "+":
          case "-":
            arr[0][2] = doCalculation(arr[1])
            return doCalculation(arr[0])
          case "*":
          case "/":
            arr[1][0] = doCalculation(arr[0])
            return doCalculation(arr[1])
        }
      } else {
        let i = 1;
        for (; i < arr.length - 1; i++) {
          switch (arr[i - 1][1]) {
            case "+":
            case "-":
              switch (arr[i][1]) {
                case "+":
                case "-":
                  arr[i][0] = doCalculation(arr[i - 1]);
                  break;
                  case "*":
                  case "/":
                  arr[i+1][0] = arr[i - 1][2] = doCalculation(arr[i]);
                  arr[i] = arr[i - 1];
                  break;
              }
              break;
            case "*":
            case "/":
              arr[i][0] = doCalculation(arr[i - 1]);
              break;
          }
        }
        return calc([arr[arr.length-2],arr[arr.length-1]])
      }
    }
    for (let i = 0, j = 0; i < str.length; i++) {
      if (str[i] !== "(") {
        newStr[j] = str[i];
        j++;
      } else {
        [newStr[j], i] = subArray(str, i, simplifying);
        j++;
      }
    }
    return simplifying(newStr);
  }
}
const clc = new Calculator();
console.log(
  clc.calculate(
   '(2.5 + 1.5) * 3'
  )
);

module.exports = Calculator;
