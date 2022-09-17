import { ACTIONS_TYPES } from "../actions/calculatorActions"

import { initialState } from "../App"

export default function reducer (state, {type, payload}) {

    // Go through all logic flux of eachs operations
    const makeLogicOperations = (operator) => {
  
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
      
      // Division Operation
      case ACTIONS_TYPES.divisionOperation:
        return makeLogicOperations("/")
      
      // Multiple Operation
      case ACTIONS_TYPES.multipleOperation:
        return makeLogicOperations("x")
  
      // Equal Operation
      case ACTIONS_TYPES.equalOperation:
        if(state.operation === "=" || state.operation === null) return state
  
        if (state.operation === "/" && state.currentNumber === "0") return state
  
        return {currentNumber: `${ makeMathOperations(state.operation) }`, previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`, operation: "="}
      
      // Invert the signal
      case ACTIONS_TYPES.invertSign:
        if (state.currentNumber === "0") return state

        if(state.currentNumber.includes("-")) return {...state, currentNumber: state.currentNumber.slice(1,)}
        
        return {...state, currentNumber: `-${state.currentNumber}`}
    }
  
    
  }