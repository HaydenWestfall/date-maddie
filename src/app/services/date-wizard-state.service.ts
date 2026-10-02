import { Injectable, computed, signal } from '@angular/core';

export type DinnerChoice =
  | "Cooper's Hawk"
  | 'Cheesecake Factory'
  | 'Bistecca (New Italian in DYT)'
  | 'Mode X (Fancy Mexican, Greene)';
export type AfterDinnerChoice = 'dessert' | 'drinks';
export type DessertChoice =
  | 'ColdStone'
  | 'Cheesecake Factory Triple Chocolate Cake'
  | 'Other';
export type DrinksChoice =
  | 'Crafted and Cured'
  | 'The Foundry'
  | 'Dayton Barrel Works Artisan Distillery';
export type DateOption =
  | '2026-10-09'
  | '2026-10-10'
  | '2026-10-30'
  | '2026-11-06'
  | '2026-11-07';
export type PumpkinsChoice = 'yes' | 'already-bought';
export type AccessMode = 'locked' | 'normal' | 'afterDark';

export enum WizardStep {
  Pumpkins = 'pumpkins',
  Dinner = 'dinner',
  AfterDinner = 'afterDinner',
  SubChoice = 'subChoice',
  DatePick = 'datePick',
  Music = 'music',
  Summary = 'summary',
}

export enum AfterDarkStep {
  Curfew = 'curfew',
  MassageGate = 'massageGate',
  MassageWhere = 'massageWhere',
  MassageHow = 'massageHow',
  Summary = 'summary',
}

export type CurfewTime =
  | '8:00 PM'
  | '9:00 PM'
  | '10:00 PM'
  | '11:00 PM'
  | '12:00 AM';
export type MassageWhere =
  | 'Car'
  | 'Couch'
  | 'Bed'
  | 'Couch → Bed'
  | 'Shower → Bed';
export type MassageHow =
  | 'You on top'
  | 'Me on top'
  | 'Why set limitations?'
  | 'Hayden, leave something up to the imagination';

export const DINNER_OPTIONS: DinnerChoice[] = [
  "Cooper's Hawk",
  'Cheesecake Factory',
  'Bistecca (New Italian in DYT)',
  'Mode X (Fancy Mexican, Greene)',
];
export const DESSERT_OPTIONS: DessertChoice[] = [
  'ColdStone',
  'Cheesecake Factory Triple Chocolate Cake',
  'Other',
];
export const DRINKS_OPTIONS: DrinksChoice[] = [
  'Crafted and Cured',
  'The Foundry',
  'Dayton Barrel Works Artisan Distillery',
];
export const DATE_OPTIONS: { value: DateOption; label: string }[] = [
  { value: '2026-10-09', label: 'Fri, Oct 9' },
  { value: '2026-10-10', label: 'Sat, Oct 10' },
  { value: '2026-10-30', label: 'Fri, Oct 30' },
  { value: '2026-11-06', label: 'Fri, Nov 6' },
  { value: '2026-11-07', label: 'Sat, Nov 7' },
];

export const CURFEW_OPTIONS: CurfewTime[] = [
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
  '12:00 AM',
];
export const MASSAGE_WHERE_OPTIONS: MassageWhere[] = [
  'Car',
  'Couch',
  'Bed',
  'Couch → Bed',
  'Shower → Bed',
];
export const MASSAGE_HOW_OPTIONS: MassageHow[] = [
  'You on top',
  'Me on top',
  'Why set limitations?',
  'Hayden, leave something up to the imagination',
];

@Injectable({ providedIn: 'root' })
export class DateWizardStateService {
  readonly accessMode = signal<AccessMode>('locked');
  readonly hasSaidYesToProposal = signal(false);
  readonly currentStep = signal<WizardStep>(WizardStep.Pumpkins);

  readonly pumpkinsChoice = signal<PumpkinsChoice | null>(null);
  readonly dinner = signal<DinnerChoice | null>(null);
  readonly afterDinner = signal<AfterDinnerChoice | null>(null);
  readonly dessertChoice = signal<DessertChoice | null>(null);
  readonly dessertCustomText = signal<string>('');
  readonly drinksChoice = signal<DrinksChoice | null>(null);
  readonly selectedDate = signal<DateOption | null>(null);
  readonly songRequests = signal<string[]>(['', '', '']);

  readonly hasAnsweredFlowerPopup = signal(false);
  readonly showFlowerPopup = signal(false);

  readonly hasPassedQuiz = signal(false);
  readonly showQuiz = signal(false);

  readonly afterDarkStep = signal<AfterDarkStep>(AfterDarkStep.Curfew);
  readonly curfewTime = signal<CurfewTime | null>(null);
  readonly massageWhere = signal<MassageWhere | null>(null);
  readonly massageHow = signal<MassageHow | null>(null);
  readonly kissCount = signal<number | null>(null);
  readonly showKissCountPopup = signal(false);

  readonly canLeaveSubChoice = computed(() => {
    if (this.afterDinner() === 'dessert') {
      const choice = this.dessertChoice();
      return (
        choice !== null &&
        (choice !== 'Other' || this.dessertCustomText().trim().length > 0)
      );
    }
    if (this.afterDinner() === 'drinks') {
      return this.drinksChoice() !== null;
    }
    return false;
  });

  unlockNormal(): void {
    this.accessMode.set('normal');
  }

  unlockAfterDark(): void {
    this.accessMode.set('afterDark');
  }

  setCurfewTime(time: CurfewTime): void {
    this.curfewTime.set(time);
    this.afterDarkStep.set(AfterDarkStep.MassageGate);
  }

  passMassageGate(): void {
    this.afterDarkStep.set(AfterDarkStep.MassageWhere);
  }

  setMassageWhere(where: MassageWhere): void {
    this.massageWhere.set(where);
    this.showKissCountPopup.set(true);
  }

  setKissCount(count: number): void {
    this.kissCount.set(count);
    this.showKissCountPopup.set(false);
    this.afterDarkStep.set(AfterDarkStep.MassageHow);
  }

  setMassageHow(how: MassageHow): void {
    this.massageHow.set(how);
    this.afterDarkStep.set(AfterDarkStep.Summary);
  }

  acceptProposal(): void {
    this.hasSaidYesToProposal.set(true);
  }

  setPumpkinsChoice(choice: PumpkinsChoice): void {
    this.pumpkinsChoice.set(choice);
    this.currentStep.set(WizardStep.Dinner);
  }

  setDinner(choice: DinnerChoice): void {
    this.dinner.set(choice);
    if (!this.hasAnsweredFlowerPopup()) {
      this.showFlowerPopup.set(true);
    } else {
      this.currentStep.set(WizardStep.AfterDinner);
    }
  }

  answerFlowerPopup(): void {
    this.hasAnsweredFlowerPopup.set(true);
    this.showFlowerPopup.set(false);
    this.currentStep.set(WizardStep.AfterDinner);
  }

  setAfterDinner(choice: AfterDinnerChoice): void {
    this.afterDinner.set(choice);
    this.dessertChoice.set(null);
    this.dessertCustomText.set('');
    this.drinksChoice.set(null);
    this.currentStep.set(WizardStep.SubChoice);
  }

  setDessertChoice(choice: DessertChoice): void {
    this.dessertChoice.set(choice);
  }

  setDessertCustomText(text: string): void {
    this.dessertCustomText.set(text);
  }

  setDrinksChoice(choice: DrinksChoice): void {
    this.drinksChoice.set(choice);
  }

  confirmSubChoice(): void {
    if (this.hasPassedQuiz()) {
      this.currentStep.set(WizardStep.DatePick);
    } else {
      this.showQuiz.set(true);
    }
  }

  passQuiz(): void {
    this.hasPassedQuiz.set(true);
    this.showQuiz.set(false);
    this.currentStep.set(WizardStep.DatePick);
  }

  setSelectedDate(date: DateOption): void {
    this.selectedDate.set(date);
    this.currentStep.set(WizardStep.Music);
  }

  setSongRequest(index: number, value: string): void {
    const next = [...this.songRequests()];
    next[index] = value;
    this.songRequests.set(next);
  }

  confirmMusic(): void {
    this.currentStep.set(WizardStep.Summary);
  }

  goBackTo(step: WizardStep): void {
    this.currentStep.set(step);
  }
}
