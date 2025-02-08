import { Injectable, signal } from "@angular/core";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "⨉", "÷"];
const specialOperators = ["%", ".", "C", "=", "+/-", "BACKSPACE"];

@Injectable({
  providedIn: "root",
})
export class CalculatorService {
  resultText = signal("0");
  subResultText = signal("0");
  lastOperator = signal("+");

  constructNumber(value: string): void {
    if (![...numbers, ...operators, ...specialOperators].includes(value))
      return;

    if (value === "C") {
      this.resultText.set("0");
      this.subResultText.set("0");
      this.lastOperator.set("+");
      return;
    }

    if (value === "BACKSPACE") {
      if (this.resultText() === "0") return;
      if (this.resultText().length === 1) {
        this.resultText.set("0");
        return;
      }
      this.resultText.update((v) => v.slice(0, -1));
      return;
    }

    if (numbers.includes(value) && this.resultText().length === 10) return;

    if (value === "=") {
      this.calculateResult();
      return;
    }

    if (value === "." && !this.resultText().includes(".")) {
      this.resultText.update((v) => v.concat(value));
      return;
    }

    if (value === "+/-") {
      if (this.resultText() === "0") return;
      if (this.resultText()[0] === "-") {
        this.resultText.update((v) => v.slice(1));
        return;
      }
      this.resultText.update((v) => "-".concat(v));
      return;
    }

    if (numbers.includes(value)) {
      if (this.resultText() === "0") {
        this.resultText.set(value);
        return;
      }
      this.resultText.update((v) => v.concat(value));
      return;
    }

    if (operators.includes(value)) {
      if (value === "⨉") value = "x";
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set("0");
      return;
    }
  }

  calculateResult(): void {
    const firstNumber = parseFloat(this.subResultText());
    const secondNumber = parseFloat(this.resultText());

    let result = 0;

    if (firstNumber === 0) return;

    switch (this.lastOperator()) {
      case "-":
        result = firstNumber - secondNumber;
        break;

      case "+":
        result = firstNumber + secondNumber;
        break;

      case "÷":
        result = firstNumber / secondNumber;
        break;

      case "x":
        result = firstNumber * secondNumber;
        break;
    }

    if (result.toString().length > 10) {
      result = parseFloat(result.toString().slice(0, 10));
    }

    this.resultText.set(result.toString());
    this.subResultText.set("0");
    this.lastOperator.set("+");
  }
}
