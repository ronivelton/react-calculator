import styles from "./Calculator.module.css"


export default function CalculatorButtons({children, type, dispatch}) {

  return (
    <button onClick={() => dispatch({type: type, payload: {digit: children}})} className={styles[type]}>{children}</button>
  )
}
