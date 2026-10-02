import { Component, inject } from '@angular/core';
import { DateWizardStateService, WizardStep } from '../../services/date-wizard-state.service';
import { FlowerPopupComponent } from '../flower-popup/flower-popup.component';
import { QuizPopupComponent } from '../quiz-popup/quiz-popup.component';
import { PumpkinsStepComponent } from '../steps/pumpkins-step/pumpkins-step.component';
import { DinnerStepComponent } from '../steps/dinner-step/dinner-step.component';
import { AfterDinnerStepComponent } from '../steps/after-dinner-step/after-dinner-step.component';
import { DessertChoiceStepComponent } from '../steps/dessert-choice-step/dessert-choice-step.component';
import { DrinksChoiceStepComponent } from '../steps/drinks-choice-step/drinks-choice-step.component';
import { DateStepComponent } from '../steps/date-step/date-step.component';
import { MusicStepComponent } from '../steps/music-step/music-step.component';
import { SummaryScreenComponent } from '../summary-screen/summary-screen.component';

@Component({
  selector: 'app-wizard-container',
  standalone: true,
  imports: [
    FlowerPopupComponent,
    QuizPopupComponent,
    PumpkinsStepComponent,
    DinnerStepComponent,
    AfterDinnerStepComponent,
    DessertChoiceStepComponent,
    DrinksChoiceStepComponent,
    DateStepComponent,
    MusicStepComponent,
    SummaryScreenComponent,
  ],
  templateUrl: './wizard-container.component.html',
  styleUrl: './wizard-container.component.scss',
})
export class WizardContainerComponent {
  protected readonly state = inject(DateWizardStateService);
  protected readonly WizardStep = WizardStep;
}
