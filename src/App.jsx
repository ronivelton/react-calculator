import React, { useState } from 'react'

import styles from "./App.module.css"

import CalculatorButtons from "./components/CalculatorButtons"


const ACTIONS_TYPES = {
  number: "number",
  dot: "dot",
  delete: "delete",
  deleteAll: "deleteAll",
  add: "add",
  subtract: "subtract",
  percentage: "porcentage",
  multiple: "multiple",
  division: "division",
  equal: "equal",
  sign: "sign"
}

function App() {
  const [currentNumber, setCurrentNumber] = useState("0")

  const [previousNumber, setPreviousNumber] = useState("")

  const [operator, setOperator] = useState("")

  const [displayResult, setDisplayResult] = useState("")


  const handleInputValue = (event) => {
    event.preventDefault()

    const element = event.target

    switch (element.getAttribute("data-type")) {

      case ACTIONS_TYPES.number:
        if(currentNumber.length === 20) break
        if (currentNumber === "0" && element.innerHTML !== "0") setCurrentNumber(element.innerHTML)
        else if (currentNumber !== "0") setCurrentNumber(currentNumber + element.innerHTML)
        setDisplayResult("")
        break

      case ACTIONS_TYPES.deleteAll:
        setCurrentNumber("0")
        setDisplayResult()
        setPreviousNumber("")
        setOperator("")
        break

      case ACTIONS_TYPES.delete:
        if(currentNumber.length === 1) setCurrentNumber("0")
        else setCurrentNumber(currentNumber.slice(0, -1))
        break

      case ACTIONS_TYPES.add:
        if (previousNumber && operator === "+") {
          const result = Number(previousNumber) + (displayResult ? Number(displayResult) : Number(currentNumber))
          setCurrentNumber("0")
          setDisplayResult(result.toString())
          setPreviousNumber(result.toString())
        }
        else if (operator && operator !== "+") {
          setOperator("+")
        }
        else if(displayResult) {
          setPreviousNumber(displayResult)
          setDisplayResult(displayResult)
          setCurrentNumber("0")
          setOperator("+")
        }
        else {
          setPreviousNumber(currentNumber)
          setDisplayResult(currentNumber)
          setCurrentNumber("0")
          setOperator("+")
        }
        break
      
      case ACTIONS_TYPES.subtract:
        if (previousNumber &&  operator === "-") {
          const result = Number(previousNumber) - (displayResult ? Number(displayResult) : Number(currentNumber))
          setCurrentNumber("0")
          setDisplayResult(result.toString())
          setPreviousNumber(result.toString())
        }
        else if (currentNumber && (operator && operator !== "-")) {
          setOperator("-")
        }
        else if(displayResult) {
          setPreviousNumber(displayResult)
          setDisplayResult(displayResult)
          setCurrentNumber("0")
          setOperator("-")
        } 
        else {
          setPreviousNumber(currentNumber)
          setDisplayResult(currentNumber)
          setCurrentNumber("0")
          setOperator("-")
        }
        break

      case ACTIONS_TYPES.equal:
        if (previousNumber){
          let result = 0
          switch(operator){
            case "+":
              result = Number(previousNumber) + (displayResult ? Number(displayResult) : Number(currentNumber))
              break
            case "-":
              result = Number(previousNumber) - (displayResult ? Number(displayResult) : Number(currentNumber))
          }
          setDisplayResult(result.toString())
          setCurrentNumber("0")
          setPreviousNumber("")
          setOperator("")
        }
        break
    }
  }


  return (
    <main className={styles.app}>
      <div className={styles.calculator}>
        <div className={styles.screenWrapper}>
            <span className={styles.screenPrevious}>
              {previousNumber}
              {operator}
            </span>
            <span className={styles.screenCurrent}>
                {displayResult || currentNumber}
            </span>
          </div>

            <CalculatorButtons type={ACTIONS_TYPES.percentage}>%</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.deleteAll}>AC</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.delete}>DEL</CalculatorButtons>
            <CalculatorButtons type={ACTIONS_TYPES.division}>/</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>7</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>8</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>9</CalculatorButtons>
            <CalculatorButtons type={ACTIONS_TYPES.multiple}>x</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>4</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>5</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>6</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.subtract}>-</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>1</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>2</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>3</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.add}>+</CalculatorButtons>

            <CalculatorButtons type={ACTIONS_TYPES.sign}>+/-</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.number}>0</CalculatorButtons>
            <CalculatorButtons type={ACTIONS_TYPES.dot}>.</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type={ACTIONS_TYPES.equal}>=</CalculatorButtons>
      
      </div>
    </main>
  )
}

export default App
