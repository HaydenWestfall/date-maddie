import { Component, inject, signal } from '@angular/core';
import { DateWizardStateService } from '../../services/date-wizard-state.service';

const MONTHS: { pattern: string; index: number }[] = [
  { pattern: 'january', index: 0 },
  { pattern: 'jan', index: 0 },
  { pattern: 'february', index: 1 },
  { pattern: 'feb', index: 1 },
  { pattern: 'march', index: 2 },
  { pattern: 'mar', index: 2 },
  { pattern: 'april', index: 3 },
  { pattern: 'apr', index: 3 },
  { pattern: 'may', index: 4 },
  { pattern: 'june', index: 5 },
  { pattern: 'jun', index: 5 },
  { pattern: 'july', index: 6 },
  { pattern: 'jul', index: 6 },
  { pattern: 'august', index: 7 },
  { pattern: 'aug', index: 7 },
  { pattern: 'september', index: 8 },
  { pattern: 'sept', index: 8 },
  { pattern: 'sep', index: 8 },
  { pattern: 'october', index: 9 },
  { pattern: 'oct', index: 9 },
  { pattern: 'november', index: 10 },
  { pattern: 'nov', index: 10 },
  { pattern: 'december', index: 11 },
  { pattern: 'dec', index: 11 },
].sort((a, b) => b.pattern.length - a.pattern.length);

const WRONG_MESSAGES = [
  'Madison Bethany... I am disappointed',
  'Another wrong answer? You know I am being notified of this',
  'Its like it meant nothing to you',
];

interface TargetDate {
  year: number;
  month: number; // 0-indexed
  day: number;
}

// The day we first met — the "real" password.
const FIRST_MET: TargetDate = { year: 2019, month: 10, day: 3 };
// A hidden second password nobody's told about. Don't hint at it anywhere in the UI.
const SECRET_UNLOCK: TargetDate = { year: 2020, month: 6, day: 28 };

function matchesDate(raw: string, target: TargetDate): boolean {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/(\d+)(st|nd|rd|th)\b/g, '$1');

  if (!cleaned) {
    return false;
  }

  const monthEntry = MONTHS.find((m) => new RegExp(`\\b${m.pattern}\\b`).test(cleaned));
  const numbers = cleaned.match(/\d+/g)?.map(Number) ?? [];

  if (monthEntry) {
    const year = numbers.find((n) => n >= 1000);
    const day = numbers.find((n) => n < 1000);
    return monthEntry.index === target.month && day === target.day && year === target.year;
  }

  if (numbers.length === 3) {
    const year = numbers.find((n) => n >= 1000);
    const rest = numbers.filter((n) => n < 1000);
    if (year === target.year && rest.length === 2) {
      const [a, b] = rest;
      if ((a - 1 === target.month && b === target.day) || (b - 1 === target.month && a === target.day)) {
        return true;
      }
    }
  }

  const parsed = new Date(cleaned);
  return (
    !isNaN(parsed.getTime()) &&
    parsed.getFullYear() === target.year &&
    parsed.getMonth() === target.month &&
    parsed.getDate() === target.day
  );
}

@Component({
  selector: 'app-auth-gate',
  standalone: true,
  imports: [],
  templateUrl: './auth-gate.component.html',
  styleUrl: './auth-gate.component.scss',
})
export class AuthGateComponent {
  private readonly state = inject(DateWizardStateService);

  readonly answer = signal('');
  readonly wrongMessage = signal<string | null>(null);
  private wrongCount = 0;

  onInput(event: Event): void {
    this.answer.set((event.target as HTMLInputElement).value);
  }

  submit(): void {
    const value = this.answer();

    if (matchesDate(value, SECRET_UNLOCK)) {
      this.state.unlockAfterDark();
      return;
    }

    if (matchesDate(value, FIRST_MET)) {
      this.state.unlockNormal();
      return;
    }

    this.wrongMessage.set(WRONG_MESSAGES[this.wrongCount % WRONG_MESSAGES.length]);
    this.wrongCount++;
  }
}
