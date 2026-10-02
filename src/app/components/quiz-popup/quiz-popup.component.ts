import { Component, computed, inject, signal } from '@angular/core';
import { DateWizardStateService } from '../../services/date-wizard-state.service';
import { ConfettiService } from '../shared/confetti/confetti.service';

interface Question {
  prompt: string;
  options: string[];
  correct: string;
  wrongMessages: string[];
  grid?: boolean;
}

const QUESTIONS: Question[] = [
  {
    prompt: 'On a scale of 1 to 10, how good are you going to look?',
    options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    correct: '10',
    grid: true,
    wrongMessages: [
      'Psh, with that ass? Try again 😌',
      'Do you even know what "Dime piece" means? Try again.',
      'Sweetheart, you are a smokeshow.',
      'Son of a bitch, just pick 10 and accept the compliment.',
    ],
  },
  {
    prompt:
      'True or false: we will have drinks while getting ready for our evening.',
    options: ['True', 'False'],
    correct: 'True',
    wrongMessages: [
      'Uuhhh yeah, okay.... 🍷',
      'Wrong answer, and you know it.',
    ],
  },
  {
    prompt: 'How much are you looking forward to this date?',
    options: [
      'Meh, it could be fun',
      'Yeah, we will probably have a good time',
      'This could be the best night of my life. Not to be dramatic.',
    ],
    correct: 'This could be the best night of my life. Not to be dramatic.',
    wrongMessages: ['Okay, well that was hurtful 🥺', 'I mean, wtf...'],
  },
];

@Component({
  selector: 'app-quiz-popup',
  standalone: true,
  imports: [],
  templateUrl: './quiz-popup.component.html',
  styleUrl: './quiz-popup.component.scss',
})
export class QuizPopupComponent {
  private readonly state = inject(DateWizardStateService);
  private readonly confetti = inject(ConfettiService);

  readonly questions = QUESTIONS;
  readonly index = signal(0);
  readonly wrongMessage = signal<string | null>(null);
  readonly shakeKey = signal(0);
  readonly current = computed(() => QUESTIONS[this.index()]);

  private wrongCount = 0;

  answer(option: string): void {
    const q = this.current();
    if (option !== q.correct) {
      this.wrongMessage.set(
        q.wrongMessages[this.wrongCount % q.wrongMessages.length],
      );
      this.wrongCount++;
      this.shakeKey.update((k) => k + 1);
      return;
    }

    this.wrongMessage.set(null);
    this.wrongCount = 0;
    if (this.index() < QUESTIONS.length - 1) {
      this.index.update((i) => i + 1);
    } else {
      this.confetti.celebrate();
      setTimeout(() => this.state.passQuiz(), 900);
    }
  }
}
