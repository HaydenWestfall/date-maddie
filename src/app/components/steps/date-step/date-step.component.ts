import { Component, inject } from '@angular/core';
import { DATE_OPTIONS, DateOption, DateWizardStateService, WizardStep } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-date-step',
  standalone: true,
  imports: [],
  templateUrl: './date-step.component.html',
  styleUrl: './date-step.component.scss',
})
export class DateStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = DATE_OPTIONS;

  choose(date: DateOption): void {
    this.state.setSelectedDate(date);
  }

  back(): void {
    this.state.goBackTo(WizardStep.SubChoice);
  }
}
