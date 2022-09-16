import styles from "./Calculator.module.css"

export default function CalculatorButtons({children, type, handleInputValue}) {
    
 

  return (
    <button onClick={(e) => handleInputValue(e)} data-type={type} className={styles[type]}>{children}</button>
  )
}
