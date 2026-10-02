import { Component, inject } from '@angular/core';
import { AfterDarkStep, DateWizardStateService } from '../../../services/date-wizard-state.service';
import { DisclaimerStepComponent } from '../steps/disclaimer-step/disclaimer-step.component';
import { CurfewStepComponent } from '../steps/curfew-step/curfew-step.component';
import { MassageGateStepComponent } from '../steps/massage-gate-step/massage-gate-step.component';
import { MassageWhereStepComponent } from '../steps/massage-where-step/massage-where-step.component';
import { MassageHowStepComponent } from '../steps/massage-how-step/massage-how-step.component';
import { KissCountPopupComponent } from '../kiss-count-popup/kiss-count-popup.component';
import { AfterDarkSummaryComponent } from '../after-dark-summary/after-dark-summary.component';

@Component({
  selector: 'app-after-dark-container',
  standalone: true,
  imports: [
    DisclaimerStepComponent,
    CurfewStepComponent,
    MassageGateStepComponent,
    MassageWhereStepComponent,
    MassageHowStepComponent,
    KissCountPopupComponent,
    AfterDarkSummaryComponent,
  ],
  templateUrl: './after-dark-container.component.html',
  styleUrl: './after-dark-container.component.scss',
})
export class AfterDarkContainerComponent {
  protected readonly state = inject(DateWizardStateService);
  protected readonly AfterDarkStep = AfterDarkStep;
}
