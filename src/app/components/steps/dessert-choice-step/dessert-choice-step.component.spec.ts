import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DessertChoiceStepComponent } from './dessert-choice-step.component';
import { DateWizardStateService } from '../../../services/date-wizard-state.service';

describe('DessertChoiceStepComponent', () => {
  let fixture: ComponentFixture<DessertChoiceStepComponent>;
  let component: DessertChoiceStepComponent;
  let state: DateWizardStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DessertChoiceStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DessertChoiceStepComponent);
    component = fixture.componentInstance;
    state = TestBed.inject(DateWizardStateService);
    spyOn(state, 'confirmSubChoice');
    fixture.detectChanges();
  });

  it('advances immediately after a dessert selection is made', () => {
    component.choose('ColdStone');

    expect(state.confirmSubChoice).toHaveBeenCalledTimes(1);
  });
});
