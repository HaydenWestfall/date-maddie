import { Component, inject } from '@angular/core';
import {
  DateWizardStateService,
  DRINKS_OPTIONS,
  DrinksChoice,
  WizardStep,
} from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-drinks-choice-step',
  standalone: true,
  imports: [],
  templateUrl: './drinks-choice-step.component.html',
  styleUrl: './drinks-choice-step.component.scss',
})
export class DrinksChoiceStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = DRINKS_OPTIONS;

  choose(option: DrinksChoice): void {
    this.state.setDrinksChoice(option);
    this.state.confirmSubChoice();
  }

  back(): void {
    this.state.goBackTo(WizardStep.AfterDinner);
  }
}
