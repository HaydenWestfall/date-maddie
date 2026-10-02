import { Component, inject } from '@angular/core';
import {
  DateWizardStateService,
  DESSERT_OPTIONS,
  DessertChoice,
  WizardStep,
} from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-dessert-choice-step',
  standalone: true,
  imports: [],
  templateUrl: './dessert-choice-step.component.html',
  styleUrl: './dessert-choice-step.component.scss',
})
export class DessertChoiceStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = DESSERT_OPTIONS;

  choose(option: DessertChoice): void {
    this.state.setDessertChoice(option);
    if (option !== 'Other') {
      this.state.confirmSubChoice();
    }
  }

  onCustomTextInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.setDessertCustomText(value);
  }

  continue(): void {
    this.state.confirmSubChoice();
  }

  back(): void {
    this.state.goBackTo(WizardStep.AfterDinner);
  }
}
