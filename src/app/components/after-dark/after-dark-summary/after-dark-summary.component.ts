import { Component, inject } from '@angular/core';
import { DateWizardStateService } from '../../../services/date-wizard-state.service';
import { MAILTO_CONFIG } from '../../../config/mailto.config';

@Component({
  selector: 'app-after-dark-summary',
  standalone: true,
  imports: [],
  templateUrl: './after-dark-summary.component.html',
  styleUrl: './after-dark-summary.component.scss',
})
export class AfterDarkSummaryComponent {
  protected readonly state = inject(DateWizardStateService);

  buildMailtoUrl(): string {
    const bodyLines = [
      `Home by: ${this.state.curfewTime()}`,
      `Where: ${this.state.massageWhere()}`,
      `Kiss count: ${this.state.kissCount()}`,
      `How: ${this.state.massageHow()}`,
      '',
      '😏',
    ];

    const subject = encodeURIComponent('Eyes only 🔥');
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${MAILTO_CONFIG.toEmail}?subject=${subject}&body=${body}`;
  }
}
