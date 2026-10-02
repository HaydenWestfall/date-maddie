import { Component, inject } from '@angular/core';
import { DateWizardStateService, WizardStep } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-music-step',
  standalone: true,
  imports: [],
  templateUrl: './music-step.component.html',
  styleUrl: './music-step.component.scss',
})
export class MusicStepComponent {
  protected readonly state = inject(DateWizardStateService);
  readonly slots = [0, 1, 2];

  onSongInput(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.state.setSongRequest(index, value);
  }

  continue(): void {
    this.state.confirmMusic();
  }

  back(): void {
    this.state.goBackTo(WizardStep.DatePick);
  }
}
