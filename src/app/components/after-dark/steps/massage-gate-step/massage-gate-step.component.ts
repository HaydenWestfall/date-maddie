import { Component, inject } from '@angular/core';
import { DodgeButtonComponent } from '../../../shared/dodge-button/dodge-button.component';
import { DateWizardStateService } from '../../../../services/date-wizard-state.service';

const NO_MESSAGES = [
  'You love my massages',
  'I wont even press hard',
  'Okay, you got me. I was going to get you naked.',
  'But the massage would feel pretty good, right?',
];

@Component({
  selector: 'app-massage-gate-step',
  standalone: true,
  imports: [DodgeButtonComponent],
  templateUrl: './massage-gate-step.component.html',
  styleUrl: './massage-gate-step.component.scss',
})
export class MassageGateStepComponent {
  private readonly state = inject(DateWizardStateService);

  readonly noMessages = NO_MESSAGES;

  sayYes(): void {
    this.state.passMassageGate();
  }
}
