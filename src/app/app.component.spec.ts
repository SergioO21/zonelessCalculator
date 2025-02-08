import { TestBed } from "@angular/core/testing";
import { AppComponent } from "@/app.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("Should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("Should be 3", () => {
    const num1 = 1;
    const num2 = 2;
    const res = num1 + num2;
    expect(res).toBe(3);
  });

  it("Should have the 'zoneless-calculator' title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("zoneless-calculator");
  });
});
