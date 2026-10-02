import { Component, inject } from '@angular/core';
import { DateWizardStateService, MASSAGE_HOW_OPTIONS, MassageHow } from '../../../../services/date-wizard-state.service';

@Component({
  selector: 'app-massage-how-step',
  standalone: true,
  imports: [],
  templateUrl: './massage-how-step.component.html',
  styleUrl: './massage-how-step.component.scss',
})
export class MassageHowStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = MASSAGE_HOW_OPTIONS;

  choose(option: MassageHow): void {
    this.state.setMassageHow(option);
  }
}
