import reducer from "./calculatorReducer";
import { describe, it } from "vitest";

import { ACTIONS_TYPES } from "../actions/calculatorActions";
import { initialState } from "../App";

describe("Add and delete a digit", () => {
  it("Should add a digit to the currentNumber", () => {
    const newState = reducer(initialState, {
      type: ACTIONS_TYPES.addNumber,
      payload: { digit: "1" },
    });
    expect(newState.currentNumber).toBe("1");
  });

  it("Should delete a digit", () => {
    const newState = reducer(
      { currentNumber: "12", previousNumber: null, operation: null },
      {
        type: ACTIONS_TYPES.delete,
      }
    );
    expect(newState.currentNumber).toBe("1");
  });
});

describe("Math operations", () => {
  it("Should sum 1 + 1 correctly", () => {
    const newState = reducer(
      { currentNumber: "1", previousNumber: "1", operation: "+" },
      {
        type: ACTIONS_TYPES.equalOperation,
        payload: { digit: "=" },
      }
    );
    expect(newState.currentNumber).toBe("2");
    expect(newState.previousNumber).toBe("1 + 1");
    expect(newState.operation).toBe("=");
  });
});
