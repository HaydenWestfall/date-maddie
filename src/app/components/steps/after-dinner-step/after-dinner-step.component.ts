import { Component, inject } from '@angular/core';
import { AfterDinnerChoice, DateWizardStateService, WizardStep } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-after-dinner-step',
  standalone: true,
  imports: [],
  templateUrl: './after-dinner-step.component.html',
  styleUrl: './after-dinner-step.component.scss',
})
export class AfterDinnerStepComponent {
  protected readonly state = inject(DateWizardStateService);

  choose(option: AfterDinnerChoice): void {
    this.state.setAfterDinner(option);
  }

  back(): void {
    this.state.goBackTo(WizardStep.Dinner);
  }
}
