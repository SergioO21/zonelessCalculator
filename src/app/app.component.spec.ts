import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "@/app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it("Should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("Should be 3", () => {
    const num1 = 1;
    const num2 = 2;
    const res = num1 + num2;
    expect(res).toBe(3);
  });

  it("Should have the 'zoneless-calculator' title", () => {
    expect(app.title).toBe("zoneless-calculator");
  });

  it("Should render router-outlet wrapped with css classes", () => {
    const divElement = compiled.querySelector("div");
    const divClasses = divElement?.classList.value.split(" ");
    const mustHaveClasses =
      "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(
        " "
      );

    expect(divElement).not.toBeNull();

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("Should contain 'buy me a beer' link", () => {
    const anchorElement = compiled.querySelector("a");

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe("Buy me a beer");
    expect(anchorElement?.href).toBe(
      "https://www.buymeacoffee.com/scottwindon"
    );
  });
});
