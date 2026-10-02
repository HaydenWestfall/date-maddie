import { Component, inject } from '@angular/core';
import { DATE_OPTIONS, DateWizardStateService } from '../../services/date-wizard-state.service';
import { MAILTO_CONFIG } from '../../config/mailto.config';

@Component({
  selector: 'app-summary-screen',
  standalone: true,
  imports: [],
  templateUrl: './summary-screen.component.html',
  styleUrl: './summary-screen.component.scss',
})
export class SummaryScreenComponent {
  protected readonly state = inject(DateWizardStateService);

  get afterDinnerLabel(): string {
    if (this.state.afterDinner() === 'dessert') {
      const choice = this.state.dessertChoice();
      const text = choice === 'Other' ? this.state.dessertCustomText() : choice;
      return `Dessert — ${text}`;
    }
    return `Drinks at ${this.state.drinksChoice()}`;
  }

  get dateLabel(): string {
    const match = DATE_OPTIONS.find((option) => option.value === this.state.selectedDate());
    return match?.label ?? '';
  }

  get pumpkinsLabel(): string {
    return this.state.pumpkinsChoice() === 'yes'
      ? "Let's get pumpkins & mums from The Covered Wagon"
      : 'Already has the pumpkins & mums';
  }

  get songRequests(): string[] {
    return this.state.songRequests().filter((song) => song.trim().length > 0);
  }

  get songsLabel(): string {
    return this.songRequests.length > 0 ? this.songRequests.join(', ') : 'No requests';
  }

  buildMailtoUrl(): string {
    const bodyLines = [
      `Pumpkins & mums: ${this.pumpkinsLabel}`,
      `Dinner: ${this.state.dinner()}`,
      this.afterDinnerLabel,
      `Date: ${this.dateLabel}`,
      `Car ride playlist: ${this.songsLabel}`,
      '',
      "Can't wait 💕",
    ];

    const subject = encodeURIComponent(MAILTO_CONFIG.defaultSubject);
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${MAILTO_CONFIG.toEmail}?subject=${subject}&body=${body}`;
  }
}
