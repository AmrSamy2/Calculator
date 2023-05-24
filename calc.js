class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    this.updateDisplay()

  }


  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}





const numberButtons = document.querySelectorAll('.button')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equal')
const deleteButton = document.querySelector('.delete')
// let firstNum = ""
// let secondNum = ""
// let operator = ""
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })


})
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })


})








// function add(a, b) {
//   return a + b
// }
// function subtract(a, b) {
//   if (b > a) {
//     // const temp = b
//     // b = a
//     // a = temp
//   }
//   return a - b
// }
// function multiply(a, b) {
//   return a * b
// }
// function divide(a, b) {
//   return a / b
// }
// function equal(a, b) {
//   if (operator = "+") {
//     add(a, b)
//   } else if (operator = '-') {
//     subtract(a, b)
//   }
//   else if (operator = '*') {
//     multiply(a, b)
//   }
//   else if (operator = '/') {
//     divide(a, b)
//   }
//   else {
//     return NaN
//   }
// }



equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
