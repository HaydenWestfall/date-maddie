import { Component, inject } from '@angular/core';
import { AuthGateComponent } from './components/auth-gate/auth-gate.component';
import { AfterDarkContainerComponent } from './components/after-dark/after-dark-container/after-dark-container.component';
import { ProposalScreenComponent } from './components/proposal-screen/proposal-screen.component';
import { WizardContainerComponent } from './components/wizard-container/wizard-container.component';
import { DateWizardStateService } from './services/date-wizard-state.service';

@Component({
  selector: 'app-root',
  imports: [AuthGateComponent, AfterDarkContainerComponent, ProposalScreenComponent, WizardContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly state = inject(DateWizardStateService);
}
