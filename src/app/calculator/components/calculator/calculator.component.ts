import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from "@angular/core";
import { CalculatorButtonComponent } from "@/calculator/components/calculator-button/calculator-button.component";
import { CalculatorService } from "@/calculator/services/calculator.service";

@Component({
  selector: "calculator",
  imports: [CalculatorButtonComponent],
  templateUrl: "./calculator.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @reference "tailwindcss";

    .force-tailwind {
      @apply w-1/4 w-2/4;
    }
  `,
  host: {
    "(document:keyup)": "handleKeyboardEvent($event)",
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  calculatorButtons = viewChildren(CalculatorButtonComponent);

  resultText = computed(() => this.calculatorService.resultText());
  subResultText = computed(() => this.calculatorService.subResultText());
  lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toUpperCase();

    const keyEquivalents: Record<string, string> = {
      DELETE: "C",
      ESCAPE: "C",
      ENTER: "=",
      X: "⨉",
      "*": "⨉",
      "/": "÷",
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
