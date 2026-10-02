import { Component, inject, signal } from '@angular/core';
import { DodgeButtonComponent } from '../shared/dodge-button/dodge-button.component';
import { ConfettiService } from '../shared/confetti/confetti.service';
import { DateWizardStateService } from '../../services/date-wizard-state.service';

const NO_MESSAGES = [
  'nice try 😏',
  'wrong answer',
  'the ankle is fully healed, try again',
  'that button is not for you',
  "mmm... no",
  'try clicking the other one 💗',
];

@Component({
  selector: 'app-proposal-screen',
  standalone: true,
  imports: [DodgeButtonComponent],
  templateUrl: './proposal-screen.component.html',
  styleUrl: './proposal-screen.component.scss',
})
export class ProposalScreenComponent {
  private readonly confetti = inject(ConfettiService);
  private readonly state = inject(DateWizardStateService);

  readonly noMessages = NO_MESSAGES;
  readonly isCelebrating = signal(false);

  sayYes(): void {
    if (this.isCelebrating()) {
      return;
    }
    this.isCelebrating.set(true);
    setTimeout(() => this.confetti.celebrate(), 350);
    setTimeout(() => this.state.acceptProposal(), 1400);
  }
}
