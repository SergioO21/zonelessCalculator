import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "@/calculator/components/calculator-button/calculator-button.component";
import { Component } from "@angular/core";

@Component({
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe("CalculatorButtonComponent", () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("Should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("Should apply w-1/4 if doubleSize is false", () => {
    const hostCssClasses: string[] = compiled.classList.value.split(" ");

    expect(hostCssClasses).toContain("w-1/4");
    expect(component.isDoubleSize()).toBe(false);
  });

  it("Should apply w-1/4 if doubleSize is true", () => {
    fixture.componentRef.setInput("isDoubleSize", true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(" ");

    expect(hostCssClasses).toContain("w-2/4");
    expect(component.isDoubleSize()).toBe(true);
  });

  it("Should not emit onClick when handleClick is called with no values", () => {
    spyOn(component.onClick, "emit");
    component.handleClick();
    expect(component.onClick.emit).not.toHaveBeenCalled();
  });

  it("Should emit onClick when handleClick is called with values", () => {
    component.contentValue()!.nativeElement.innerText = "  2  ";
    spyOn(component.onClick, "emit");
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalledWith("2");
  });

  it("Should set isPressed to true and then false when keyboardPressStyle is called with a matching key", (done) => {
    component.contentValue()!.nativeElement.innerText = "1";
    component.keyboardPressedStyle("1");

    expect(component.isPressed()).toBe(true);

    setTimeout(() => {
      expect(component.isPressed()).toBe(false);
      done();
    }, 101);
  });

  it("Should not set isPressed to true if key is not matching", () => {
    component.contentValue()!.nativeElement.innerText = "1";
    component.keyboardPressedStyle("2");

    expect(component.isPressed()).toBe(false);
  });

  it("Should not set isPressed to true if content value is empty", () => {
    spyOn(component, "contentValue").and.returnValue(undefined);
    spyOn(component.isPressed, "set");

    component.keyboardPressedStyle("1");

    expect(component.isPressed.set).not.toHaveBeenCalled();
  });

  it("Should display projected content", () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector(".projected-content");

    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains("underline")).toBe(true);
  });
});
