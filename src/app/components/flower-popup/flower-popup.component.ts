import { Component, inject } from '@angular/core';
import { DodgeButtonComponent } from '../shared/dodge-button/dodge-button.component';
import { DateWizardStateService } from '../../services/date-wizard-state.service';

const NO_MESSAGES = [
  'damn it, you are failing at this',
  'flowers are non-negotiable',
  'try again 💐',
  'that is not how this works',
  'nope',
];

@Component({
  selector: 'app-flower-popup',
  standalone: true,
  imports: [DodgeButtonComponent],
  templateUrl: './flower-popup.component.html',
  styleUrl: './flower-popup.component.scss',
})
export class FlowerPopupComponent {
  private readonly state = inject(DateWizardStateService);

  readonly noMessages = NO_MESSAGES;

  sayYes(): void {
    this.state.answerFlowerPopup();
  }
}
