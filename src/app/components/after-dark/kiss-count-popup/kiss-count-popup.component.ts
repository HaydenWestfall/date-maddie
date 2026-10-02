import { Component, inject, signal } from '@angular/core';
import { DateWizardStateService } from '../../../services/date-wizard-state.service';

@Component({
  selector: 'app-kiss-count-popup',
  standalone: true,
  imports: [],
  templateUrl: './kiss-count-popup.component.html',
  styleUrl: './kiss-count-popup.component.scss',
})
export class KissCountPopupComponent {
  private readonly state = inject(DateWizardStateService);

  readonly presets = [2, 4, 6, 8, 10];
  readonly customValue = signal('');

  choose(count: number): void {
    this.state.setKissCount(count);
  }

  onCustomInput(event: Event): void {
    this.customValue.set((event.target as HTMLInputElement).value);
  }

  submitCustom(): void {
    const parsed = Number(this.customValue());
    if (Number.isInteger(parsed) && parsed > 0) {
      this.state.setKissCount(parsed);
    }
  }
}
