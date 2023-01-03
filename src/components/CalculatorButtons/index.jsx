import styles from "./Calculator.module.css";

export default function CalculatorButtons({ children, type, dispatch }) {
  // Call the dispatch and remove the focus of button for prevent some unwanted behaviors (like when the key Enter is pressed call the focus element again on the browser)
  const handleDispacthActionAndRemoveFocus = (e) => {
    e.target.blur();
    dispatch({ type: type, payload: { digit: children } });
  };

  return (
    <button
      onClick={(e) => handleDispacthActionAndRemoveFocus(e)}
      className={styles[type]}
    >
      {children}
    </button>
  );
}
