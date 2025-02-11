import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorComponent } from "@/calculator/components/calculator/calculator.component";
import { CalculatorService } from "@/calculator/services/calculator.service";

class MockCalculatorService {
  resultText = jasmine.createSpy("resultText").and.returnValue("100.00");
  subResultText = jasmine.createSpy("subResultText").and.returnValue("20");
  lastOperator = jasmine.createSpy("lastOperator").and.returnValue("-");

  constructNumber = jasmine.createSpy("constructNumber");
}

describe("CalculatorComponent", () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  it("Should create the app", () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it("Should have the current getters", () => {
    expect(component.resultText()).toBe("100.00");
    expect(component.subResultText()).toBe("20");
    expect(component.lastOperator()).toBe("-");
  });

  it("Should display proper calculation values", () => {
    mockCalculatorService.resultText.and.returnValue("200");
    mockCalculatorService.subResultText.and.returnValue("47.4");
    mockCalculatorService.lastOperator.and.returnValue("*");

    fixture.detectChanges();

    expect(compiled.querySelector("span")?.innerText).toEqual("47.4 *");

    expect(component.resultText()).toBe("200");
    expect(component.subResultText()).toBe("47.4");
    expect(component.lastOperator()).toBe("*");
  });

  it("Should have 19 calculator-button components", () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it("Should have 19 calculator-button with content projection", () => {
    const buttons = compiled.querySelectorAll("calculator-button");
    expect(buttons.length).toBe(19);

    const allButtonsSorted = [
      "C",
      "+/-",
      "%",
      "÷",
      "7",
      "8",
      "9",
      "⨉",
      "4",
      "5",
      "6",
      "-",
      "1",
      "2",
      "3",
      "+",
      "0",
      ".",
      "=",
    ];

    allButtonsSorted.forEach((button, index) => {
      expect(buttons[index].textContent?.trim()).toBe(button);
    });
  });

  it("Should handle keyboard events correctly", () => {
    let keyboardEvent = new KeyboardEvent("keyup", { key: "Enter" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("=");

    keyboardEvent = new KeyboardEvent("keyup", { key: "Escape" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("C");

    keyboardEvent = new KeyboardEvent("keyup", { key: "Delete" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("C");

    keyboardEvent = new KeyboardEvent("keyup", { key: "*" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("⨉");

    keyboardEvent = new KeyboardEvent("keyup", { key: "x" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("⨉");

    keyboardEvent = new KeyboardEvent("keyup", { key: "X" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("⨉");

    keyboardEvent = new KeyboardEvent("keyup", { key: "/" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("÷");

    keyboardEvent = new KeyboardEvent("keyup", { key: "7" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("7");

    keyboardEvent = new KeyboardEvent("keyup", { key: "-" });
    document.dispatchEvent(keyboardEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith("-");
  });
});
