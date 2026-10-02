import { Component, inject } from '@angular/core';
import { DateWizardStateService } from '../../../../services/date-wizard-state.service';

@Component({
  selector: 'app-disclaimer-step',
  standalone: true,
  imports: [],
  templateUrl: './disclaimer-step.component.html',
  styleUrl: './disclaimer-step.component.scss',
})
export class DisclaimerStepComponent {
  private readonly state = inject(DateWizardStateService);

  acknowledge(): void {
    this.state.acknowledgeAfterDarkDisclaimer();
  }
}
