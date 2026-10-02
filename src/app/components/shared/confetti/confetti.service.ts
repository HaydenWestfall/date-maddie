import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  celebrate(): void {
    const colors = ['#ff6f91', '#ffb3c6', '#c9a7ff', '#ffd97d', '#ffffff'];

    confetti({ particleCount: 120, spread: 80, origin: { x: 0.3, y: 0.6 }, colors });
    confetti({ particleCount: 120, spread: 80, origin: { x: 0.7, y: 0.6 }, colors });

    setTimeout(() => {
      confetti({ particleCount: 150, spread: 120, origin: { x: 0.5, y: 0.4 }, colors, startVelocity: 45 });
    }, 300);
  }
}
