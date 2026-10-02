import { Component, inject } from '@angular/core';
import { CURFEW_OPTIONS, CurfewTime, DateWizardStateService } from '../../../../services/date-wizard-state.service';

@Component({
  selector: 'app-curfew-step',
  standalone: true,
  imports: [],
  templateUrl: './curfew-step.component.html',
  styleUrl: './curfew-step.component.scss',
})
export class CurfewStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = CURFEW_OPTIONS;

  choose(option: CurfewTime): void {
    this.state.setCurfewTime(option);
  }
}
