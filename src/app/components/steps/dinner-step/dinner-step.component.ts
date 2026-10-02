import { Component, inject } from '@angular/core';
import { DateWizardStateService, DINNER_OPTIONS, DinnerChoice, WizardStep } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-dinner-step',
  standalone: true,
  imports: [],
  templateUrl: './dinner-step.component.html',
  styleUrl: './dinner-step.component.scss',
})
export class DinnerStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = DINNER_OPTIONS;

  choose(option: DinnerChoice): void {
    this.state.setDinner(option);
  }

  back(): void {
    this.state.goBackTo(WizardStep.Pumpkins);
  }
}
