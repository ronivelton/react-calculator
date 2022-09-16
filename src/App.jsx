import React, { useState } from 'react'

import styles from "./App.module.css"

import CalculatorButtons from "./components/CalculatorButtons"

function App() {
  const [currentNumber, setCurrentNumber] = useState("0")

  const [previousNumber, setPreviousNumber] = useState("")

  const [operator, setOperator] = useState("")


  const handleInputValue = (event) => {
    event.preventDefault()

    const element = event.target

    switch (element.getAttribute("data-type")) {
      case "number":
        if (currentNumber === "0" && element.innerHTML !== "0") setCurrentNumber(element.innerHTML)
        else if (currentNumber !== "0") setCurrentNumber(currentNumber + element.innerHTML)
        break
      case "delete":
        if(currentNumber.length === 1) setCurrentNumber("0")
        else setCurrentNumber(currentNumber.slice(0, -1))
        break
      case "plus":
        if (previousNumber) {
          const result = Number(previousNumber) + Number(currentNumber)
          setCurrentNumber(result)
          setPreviousNumber("")
          setOperator("")
        }
        else {
          setPreviousNumber(currentNumber)
          setOperator("+")
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
                {currentNumber}
            </span>
          </div>

            <CalculatorButtons type="porcentage">%</CalculatorButtons>
            <CalculatorButtons type="deleteAll">C</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="delete">DEL</CalculatorButtons>
            <CalculatorButtons type="divider">/</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type="number">7</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">8</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">9</CalculatorButtons>
            <CalculatorButtons type="multiplier">x</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type="number">4</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">5</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">6</CalculatorButtons>
            <CalculatorButtons type="minus">-</CalculatorButtons>

            <CalculatorButtons handleInputValue = {handleInputValue} type="number">1</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">2</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">3</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="plus">+</CalculatorButtons>

            <CalculatorButtons type="sign">+/-</CalculatorButtons>
            <CalculatorButtons handleInputValue = {handleInputValue} type="number">0</CalculatorButtons>
            <CalculatorButtons type="dot">.</CalculatorButtons>
            <CalculatorButtons type="egual">=</CalculatorButtons>
      
      </div>
    </main>
  )
}

export default App
