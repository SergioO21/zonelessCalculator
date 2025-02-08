import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";

@Component({
  selector: "calculator-button",
  imports: [],
  templateUrl: "./calculator-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./calculator-button.component.css",
  host: {
    class: "border-r border-b border-indigo-400",
    "[class.w-1/4]": "!isDoubleSize()",
    "[class.w-2/4]": "isDoubleSize()",
  },
})
export class CalculatorButtonComponent {
  isCommand = input(false, { transform: booleanAttribute });
  isDoubleSize = input(false, { transform: booleanAttribute });
  isResult = input(false, { transform: booleanAttribute });
  isSpecial = input(false, { transform: booleanAttribute });
  text2xl = input(false, { transform: booleanAttribute });
  text3xl = input(false, { transform: booleanAttribute });

  isPressed = signal(false);

  onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>("button");

  handleClick() {
    const value = this.contentValue()?.nativeElement.innerText;
    if (!value) return;
    this.onClick.emit(value.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
