import { Component, Input, signal } from '@angular/core';

// Keep these in sync with the message bubble's max-width in dodge-button.component.scss —
// the horizontal margin needs to cover half the bubble's widest possible footprint so a
// long, wrapped message can never bleed off the edge of the screen.
const MESSAGE_MAX_WIDTH_PX = 220;
const HORIZONTAL_MARGIN_PX = MESSAGE_MAX_WIDTH_PX / 2 + 16;
const TOP_MARGIN_PX = 130; // room above the button for a 2-3 line wrapped message
const BOTTOM_MARGIN_PX = 70; // room below so the button itself never sits under the edge

@Component({
  selector: 'app-dodge-button',
  standalone: true,
  imports: [],
  templateUrl: './dodge-button.component.html',
  styleUrl: './dodge-button.component.scss',
})
export class DodgeButtonComponent {
  @Input() label = 'No';
  @Input() messages: string[] = ['nice try'];

  readonly hasHopped = signal(false);
  readonly top = signal(0);
  readonly left = signal(0);
  readonly activeMessage = signal<string | null>(null);

  private messageIndex = 0;
  private hideMessageTimeout?: ReturnType<typeof setTimeout>;

  hop(): void {
    const minLeft = HORIZONTAL_MARGIN_PX;
    const maxLeft = Math.max(minLeft, window.innerWidth - HORIZONTAL_MARGIN_PX);
    const minTop = TOP_MARGIN_PX;
    const maxTop = Math.max(minTop, window.innerHeight - BOTTOM_MARGIN_PX);

    let nextTop: number;
    let nextLeft: number;
    do {
      nextTop = minTop + Math.random() * (maxTop - minTop);
      nextLeft = minLeft + Math.random() * (maxLeft - minLeft);
    } while (this.hasHopped() && Math.abs(nextTop - this.top()) < 60 && Math.abs(nextLeft - this.left()) < 60);

    this.top.set(nextTop);
    this.left.set(nextLeft);
    this.hasHopped.set(true);

    this.activeMessage.set(this.messages[this.messageIndex % this.messages.length]);
    this.messageIndex++;

    clearTimeout(this.hideMessageTimeout);
    this.hideMessageTimeout = setTimeout(() => this.activeMessage.set(null), 2200);
  }
}
