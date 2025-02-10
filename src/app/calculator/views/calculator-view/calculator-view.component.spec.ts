import { ComponentFixture, TestBed } from "@angular/core/testing";
import CalculatorViewComponent from "@/calculator/views/calculator-view/calculator-view.component";

describe("CalculatorViewComponent", () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let app: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it("Should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("Should contain calculator component", () => {
    expect(compiled.querySelector("calculator")).not.toBeNull();
  });

  it("Should contain default css classes", () => {
    const divElement = compiled.querySelector("div");
    const divClasses = divElement?.classList.value.split(" ");
    const shouldHave =
      "w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden".split(
        " "
      );

    shouldHave.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });
});
