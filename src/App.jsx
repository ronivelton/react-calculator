import React, { useEffect, useReducer } from "react";

import styles from "./App.module.css";

import CalculatorButtons from "./components/CalculatorButtons";

import reducer from "./reducers/calculatorReducer";

import { ACTIONS_TYPES } from "./actions/calculatorActions";

export const initialState = {
  currentNumber: "0",
  previousNumber: null,
  operation: null,
};

// prettier-ignore
function App() {
  const [ {currentNumber, previousNumber, operation}, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const handleKeyPress = (e) => {
      // verify if the key pressed is numeric
      if (/^\d$/.test(e.key)) dispatch({type: ACTIONS_TYPES.addNumber, payload: {digit: e.key}})

      if(e.key === "+" ) dispatch({type: ACTIONS_TYPES.addOperation, payload: {digit: e.key}})
      if(e.key === "-" ) dispatch({type: ACTIONS_TYPES.subtractOperation, payload: {digit: e.key}})
      if(e.key === "Enter") dispatch({type: ACTIONS_TYPES.equalOperation, payload: {digit: "="}})
      if(e.key === "/" ) dispatch({type: ACTIONS_TYPES.divisionOperation, payload: {digit: e.key}})
      if(e.key === "*" ) dispatch({type: ACTIONS_TYPES.multipleOperation, payload: {digit: e.key}})
      if(e.key === "Escape" ) dispatch({type: ACTIONS_TYPES.deleteAll})
      if(e.key === "Backspace" ) dispatch({type: ACTIONS_TYPES.delete})
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch]);

  console.log(currentNumber)

  return (
    <>
      <div id='app' className={styles.app}>
        <main className={styles.calculator}>

          <div id='display' className={styles.screenWrapper}>
            <span id="display-previous" className={styles.screenPrevious}>
              {previousNumber} {operation}
            </span>
            <span id="display-current" className={styles.screenCurrent}>
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

          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.invertSign}>+/-</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.addNumber}>0</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.dot}>.</CalculatorButtons>
          <CalculatorButtons dispatch = {dispatch} type={ACTIONS_TYPES.equalOperation}>=</CalculatorButtons>
        </main>

        <footer>Made by <a href="https://github.com/ronivelton"><strong>Roni</strong></a></footer>
      </div>

      
    </>
  )
}

export default App;
