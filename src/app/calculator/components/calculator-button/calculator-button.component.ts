import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from "@angular/core";

@Component({
  selector: "calculator-button",
  imports: [],
  templateUrl: "./calculator-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./calculator-button.component.css",
  host: {
    class: "w-1/4 border-r border-b border-indigo-400",
  },
})
export class CalculatorButtonComponent {
  isCommand = input(false, {
    transform: booleanAttribute,
  });
  isDoubleSize = input(false, {
    transform: booleanAttribute,
  });
  isResult = input(false, {
    transform: booleanAttribute,
  });
  isSpecial = input(false, {
    transform: booleanAttribute,
  });
  text2xl = input(false, {
    transform: booleanAttribute,
  });
  text3xl = input(false, {
    transform: booleanAttribute,
  });

  @HostBinding("class.w-2/4") get commandStyle() {
    return this.isDoubleSize();
  }
}
