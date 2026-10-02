import { Component, inject } from '@angular/core';
import { DateWizardStateService, MASSAGE_WHERE_OPTIONS, MassageWhere } from '../../../../services/date-wizard-state.service';

@Component({
  selector: 'app-massage-where-step',
  standalone: true,
  imports: [],
  templateUrl: './massage-where-step.component.html',
  styleUrl: './massage-where-step.component.scss',
})
export class MassageWhereStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly options = MASSAGE_WHERE_OPTIONS;

  choose(option: MassageWhere): void {
    this.state.setMassageWhere(option);
  }
}
