import { test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";

test("Elements are redering", () => {
  const { getAllByRole, container } = render(<App />);

  const calculatorButtons = getAllByRole("button");
  const display = container.querySelector("#display");

  expect(calculatorButtons.length).toBe(19);
  expect(display).toBeInTheDocument();

  calculatorButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});

test("Buttons and display working correctly", () => {
  const { getByText, container } = render(<App />);

  const displayCurrent = container.querySelector("#display-current");
  const displayPrevious = container.querySelector("#display-previous");
  const button1 = getByText("1");
  const button2 = getByText("2");
  const ButtonPlus = getByText("+");
  const buttonEquals = getByText("=");

  expect(displayCurrent.textContent).toBe("0");
  expect(displayPrevious.textContent).toBe(" ");

  fireEvent.click(button1);
  expect(displayCurrent.textContent).toBe("1");

  fireEvent.click(ButtonPlus);
  expect(displayCurrent.textContent).toBe("0");
  expect(displayPrevious.textContent).toBe("1 +");

  fireEvent.click(button2);
  expect(displayCurrent.textContent).toBe("2");
  expect(displayPrevious.textContent).toBe("1 +");

  fireEvent.click(buttonEquals);
  expect(displayCurrent.textContent).toBe("3");
  expect(displayPrevious.textContent).toBe("1 + 2 =");
});

test("Keyboard events triggered correctly", () => {
  const { container } = render(<App />);
  const displayCurrent = container.querySelector("#display-current");
  const displayPrevious = container.querySelector("#display-previous");

  fireEvent.keyDown(window, { key: "1", code: "49" });
  expect(displayCurrent.textContent).toBe("1");
  expect(displayPrevious.textContent).toBe(" ");

  fireEvent.keyDown(window, { key: "+", code: "187" });
  expect(displayCurrent.textContent).toBe("0");
  expect(displayPrevious.textContent).toBe("1 +");

  fireEvent.keyDown(window, { key: "2", code: "50" });
  expect(displayCurrent.textContent).toBe("2");
  expect(displayPrevious.textContent).toBe("1 +");

  fireEvent.keyDown(window, { key: "Enter", code: "13" });
  expect(displayCurrent.textContent).toBe("3");
  expect(displayPrevious.textContent).toBe("1 + 2 =");

  fireEvent.keyDown(window, { key: "Escape", code: "27" });
  expect(displayCurrent.textContent).toBe("0");
  expect(displayPrevious.textContent).toBe(" ");
});
