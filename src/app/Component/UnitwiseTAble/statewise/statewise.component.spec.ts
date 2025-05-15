import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatewiseComponent } from './statewise.component';

describe('StatewiseComponent', () => {
  let component: StatewiseComponent;
  let fixture: ComponentFixture<StatewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatewiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
