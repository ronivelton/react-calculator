import React, { useReducer } from 'react'

import styles from "./App.module.css"

import CalculatorButtons from "./components/CalculatorButtons"


export const ACTIONS_TYPES = {
  addNumber: "addNumber",
  dot: "dot",
  delete: "delete",
  deleteAll: "deleteAll",
  addOperation: "addOperation",
  subtractOperation: "subtractOperation",
  percentageOperation: "percentageOperation",
  multipleOperation: "multipleOperation",
  divisionOperation: "divisionOperation",
  equalOperation: "equalOperation",
  sign: "sign"
}

const  initialState = {
  currentNumber: "0",
  previousNumber: null,
  operation: null
}

function reducer (state, {type, payload}) {

  // Go trough all logic flux of operations
  const makeLogicOperations = (operator) => {
    console.log("here")

    if (state.operation === "=") return {currentNumber: "0", previousNumber: state.currentNumber, operation: operator}

    if (state.previousNumber === null) return {currentNumber: "0", previousNumber: state.currentNumber, operation: operator}

    if (state.operation === "/" && state.currentNumber === "0") return {...initialState, currentNumber: "Cannot divide by zero"}

    return {currentNumber: "0", previousNumber: `${ makeMathOperations(state.operation) }`, operation: operator} 
  }

  // Make the mathematical operations
  const makeMathOperations = (operator) => {
    switch(operator){
      case "+":
        return Number(state.previousNumber) + Number(state.currentNumber)
      
      case "-":
        return Number(state.previousNumber) - Number(state.currentNumber)
      
      case "x":
        return Number(state.previousNumber) * Number(state.currentNumber)
      
      case "/":
        console.log("ola")
        
        return Number(state.previousNumber) / Number(state.currentNumber)
    }
  }


  switch (type) {

    // Add digit
    case ACTIONS_TYPES.addNumber:

      // If the last operation made was the equal operation, then a need clear the screen for nexts digits
      if (state.operation === "=") return {currentNumber: payload.digit, previousNumber: null, operation: null}

      if (state.currentNumber.length > 20) return state

      if(payload.digit === "0" && state.currentNumber === "0") return state
      

      return {...state, currentNumber: state.currentNumber === "0" ? payload.digit : `${state.currentNumber}${payload.digit}`}

    // Delete a digit
    case ACTIONS_TYPES.delete:
      if (state.operation === "=" || state.currentNumber === "Cannot divide by zero") return initialState

      if (state.currentNumber.length === 1) return {...state, currentNumber: "0"}

      return {...state, currentNumber: state.currentNumber.slice(0,-1)}

    // Clear the screen
    case ACTIONS_TYPES.deleteAll:
      return initialState
    
    // Add dot 
    case ACTIONS_TYPES.dot:
      if (state.currentNumber.includes(".")) return state

      return {...state, currentNumber: `${state.currentNumber}${payload.digit}`}

    // Sum Operation
    case ACTIONS_TYPES.addOperation:
      return makeLogicOperations("+")

    // Subtract Operation
    case ACTIONS_TYPES.subtractOperation:
      return makeLogicOperations("-")

    case ACTIONS_TYPES.divisionOperation:
      return makeLogicOperations("/")

    case ACTIONS_TYPES.multipleOperation:
      return makeLogicOperations("x")

    // Equal Operation
    case ACTIONS_TYPES.equalOperation:
      if(state.operation === "=" || state.operation === null) return state

      if (state.operation === "/" && state.currentNumber === "0") return state

      return {currentNumber: `${ makeMathOperations(state.operation) }`, previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`, operation: "="}
      
      
  }

  
}

function App() {
  const [ {currentNumber, previousNumber, operation}, dispatch] = useReducer(reducer, initialState)


  return (
    <>
      <div className={styles.app}>
        <main className={styles.calculator}>

          <div className={styles.screenWrapper}>
            <span className={styles.screenPrevious}>
              {previousNumber} {operation}
            </span>
            <span className={styles.screenCurrent}>
                {currentNumber}
            </span>
          </div>

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.deleteAll}>AC</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.delete}>DEL</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.divisionOperation}>/</CalculatorButtons>

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>7</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>8</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>9</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.multipleOperation}>x</CalculatorButtons>

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>4</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>5</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>6</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.subtractOperation}>-</CalculatorButtons>

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>1</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>2</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>3</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addOperation}>+</CalculatorButtons>

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.sign}>+/-</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>0</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.dot}>.</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.equalOperation}>=</CalculatorButtons>
        
        </main>

        <footer>Made by <a href="https://github.com/ronivelton"><strong>Roni</strong></a></footer>
      </div>

      
    </>
  )
}

export default App
