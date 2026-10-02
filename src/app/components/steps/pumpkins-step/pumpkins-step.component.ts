import { Component, inject } from '@angular/core';
import { DateWizardStateService, PumpkinsChoice } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-pumpkins-step',
  standalone: true,
  imports: [],
  templateUrl: './pumpkins-step.component.html',
  styleUrl: './pumpkins-step.component.scss',
})
export class PumpkinsStepComponent {
  protected readonly state = inject(DateWizardStateService);

  choose(choice: PumpkinsChoice): void {
    this.state.setPumpkinsChoice(choice);
  }
}
