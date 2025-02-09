import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "@/calculator/services/calculator.service";

describe("CalculatorService", () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it("Should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Should be created with default values", () => {
    expect(service.resultText()).toBe("0");
    expect(service.subResultText()).toBe("0");
    expect(service.lastOperator()).toBe("+");
  });

  it("Should set default values when C is pressed", () => {
    service.resultText.set("23");
    service.subResultText.set("12");
    service.lastOperator.set("/");

    service.constructNumber("C");

    expect(service.resultText()).toBe("0");
    expect(service.subResultText()).toBe("0");
    expect(service.lastOperator()).toBe("+");
  });

  it("Should update resultText with number input", () => {
    service.constructNumber("1");
    expect(service.resultText()).toBe("1");

    service.constructNumber("2");
    expect(service.resultText()).toBe("12");
  });

  it("Should handle operators correctly", () => {
    service.constructNumber("1");
    service.constructNumber("-");

    expect(service.lastOperator()).toBe("-");
    expect(service.subResultText()).toBe("1");
    expect(service.resultText()).toBe("0");
  });

  it("Should calculate result correctly for addition", () => {
    service.constructNumber("1");
    service.constructNumber("+");
    service.constructNumber("2");
    service.constructNumber("=");

    expect(service.resultText()).toBe("3");
  });

  it("Should calculate result correctly for subtraction", () => {
    service.constructNumber("5");
    service.constructNumber("0");
    service.constructNumber("-");
    service.constructNumber("7");
    service.constructNumber("0");
    service.constructNumber("=");

    expect(service.resultText()).toBe("-20");
  });

  it("Should calculate result correctly for division", () => {
    service.constructNumber("5");
    service.constructNumber("0");
    service.constructNumber("÷");
    service.constructNumber("5");
    service.constructNumber("=");

    expect(service.resultText()).toBe("10");
  });

  it("Should calculate result correctly for multiplication", () => {
    service.constructNumber("5");
    service.constructNumber("⨉");
    service.constructNumber("7");
    service.constructNumber("=");

    expect(service.resultText()).toBe("35");
  });

  it("Should handle decimal point correctly", () => {
    service.constructNumber("3");
    service.constructNumber(".");
    service.constructNumber("4");
    expect(service.resultText()).toBe("3.4");

    service.constructNumber(".");
    expect(service.resultText()).toBe("3.4");
  });

  it("Should handle decimal point correctly starting with 0", () => {
    service.constructNumber("0");
    service.constructNumber(".");
    service.constructNumber("0");
    service.constructNumber(".");
    service.constructNumber(".");
    expect(service.resultText()).toBe("0.0");
  });

  it("Should handle sign change correctly", () => {
    service.constructNumber("+/-");
    expect(service.resultText()).toBe("0");

    service.constructNumber("+/-");
    expect(service.resultText()).toBe("0");

    service.constructNumber("1");
    service.constructNumber("+/-");
    expect(service.resultText()).toBe("-1");

    service.constructNumber("+/-");
    expect(service.resultText()).toBe("1");
  });

  it("Should handle backspace correctly", () => {
    service.resultText.set("12.33");
    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("12.3");

    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("12.");

    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("12");

    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("1");

    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("0");

    service.constructNumber("BACKSPACE");
    expect(service.resultText()).toBe("0");
  });

  it("Should handle max length correctly", () => {
    for (let i = 0; i < 10; i++) {
      service.constructNumber("7");
    }

    expect(service.resultText().length).toBe(10);
    service.constructNumber("7");
    expect(service.resultText().length).toBe(10);
  });

  it("Should handle invalid inputs correctly", () => {
    service.constructNumber("F");
    service.constructNumber("z");
    service.constructNumber(";");
    service.constructNumber("?");
    service.constructNumber("~");
    service.constructNumber("@");

    expect(service.resultText()).toBe("0");
    expect(service.subResultText()).toBe("0");
    expect(service.lastOperator()).toBe("+");
  });
});
