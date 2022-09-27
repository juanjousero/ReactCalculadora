import './reset.css';
import './App.css';
import React, { useState } from 'react';
import { Results } from './components/Results.jsx';
import { Pad } from './components/Pad.jsx';

export function App() {
  const [selection, setSelection] = useState([]);
  const [buttons, setButtons] = useState([
    {index: 0, isNumber: false, isReset: true, value: 'AC'},
    {index: 1, isNumber: false, isReset: false, value: '+/-'},
    {index: 2, isNumber: false, isReset: false, value: '%'},
    {index: 3, isNumber: false, isReset: false, value: '+'},
    {index: 4, isNumber: true, isReset: false, value: '1'},
    {index: 5, isNumber: true, isReset: false, value: '2'},
    {index: 6, isNumber: true, isReset: false, value: '3'},
    {index: 7, isNumber: false, isReset: false, value: '-'},
    {index: 8, isNumber: true, isReset: false, value: '4'},
    {index: 9, isNumber: true, isReset: false, value: '5'},
    {index: 10, isNumber: true, isReset: false, value: '6'},
    {index: 11, isNumber: false, isReset: false, value: 'x'},
    {index: 12, isNumber: true, isReset: false, value: '7'},
    {index: 13, isNumber: true, isReset: false, value: '8'},
    {index: 14, isNumber: true, isReset: false, value: '9'},
    {index: 15, isNumber: false, isReset: false, value: '/'},
    {index: 16, isNumber: true, isReset: false, value: '0'},
    {index: 17, isNumber: false, isReset: false, value: '.'},
    {index: 18, isNumber: false, isReset: false, value: '='}
  ]);

  const findFirstNumber = (array) => {
    const number = [];
    let i = 0;
    while(i < array.length) {
      if (array[i].isNumber === false && array[i].value !== '+/-' && array[i].value !== '.') {
        break;
      }
      if (array[i].value == '+/-') {
        array[i].value = '-';
        number.push(array[i].value);
        array[i].value = '+/-';
      } else {
        number.push(array[i].value);
      }
      i++;
    }

    return number;
  }

  const findSecondNumber = (array) => {
    const secondNumber = [];
    let j = 1;
    let k = 1;
    while(j < array.length) {
      if (array[j].isNumber === false && array[j].value !== '+/-' && array[j].value !== '.') {
        j = j + 1;
        break;
      }
      j++;
    }

    k = j;
    while(k < array.length) {
      if (array[k].isNumber === false && array[k].value !== '+/-' && array[k].value !== '.') {
        break;
      }
      secondNumber.push(array[k].value);
      k++;
    }
    return secondNumber;
  }

  const findOperationType = (array) => {
    let operation = '';
    let h = 0;
    //let h = 1;
    while (h < array.length) {
      if (array[h].isNumber === false && array[h].value !== '+/-' && array[h].value !== '.') {
        break;
      }
      operation = array[h + 1].value;
      h++;
    }
    console.log(operation);
    return operation;
  }

  const calculateResult = (num1, num2, operation) => {
    let resultNumber = 0;
    switch(operation) {
      case '+':
        resultNumber = num1 + num2;
        break;
      case '-':
        resultNumber = num1 - num2;
        break;
      case 'x':
        resultNumber = num1 * num2;
        break;
      case '/':
        resultNumber = num1 / num2;
        break;
      case '%':
        if (num2 == 0) {
          resultNumber = num1 / 100;
        } else {
          resultNumber = (num1 / 100) * num2;
        }
        break;
      default:
        break;
    }

    return resultNumber;
  }

  const addToOperation = (item) => {
    if (item.isReset) {
      setSelection([]);
    } else if (item.value == '=') {
      let firstNumber = Number(findFirstNumber(selection).join(''));
      let secondNumber = Number(findSecondNumber(selection).join(''));
      let operationType = findOperationType(selection);
      console.log(`Num1: ${firstNumber} || Num2: ${secondNumber} || Op: ${operationType}`);
      let result = calculateResult(firstNumber, secondNumber, operationType);
      setSelection(result);
    } else if (item.value == '+/-') {
      if (selection[0].value !== '+/-') {
        setSelection([item, ...selection]);
      } else {
        selection.shift();
        setSelection([...selection]);
      }
    } else {
      if (typeof(selection) === typeof(0)) {
        setSelection([item]);
      } else {
        setSelection([...selection, item]);
      }
    }
  };

  return (
    <div className="App">
      <Results selection={selection}
               setSelection={setSelection}/>
      <Pad items={buttons}
           onClick={addToOperation}/>
    </div>
  );
}