import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonEmissionCalculatorComponent } from './carbon-emission-calculator.component';

describe('CarbonEmissionCalculatorComponent', () => {
  let component: CarbonEmissionCalculatorComponent;
  let fixture: ComponentFixture<CarbonEmissionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonEmissionCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonEmissionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
