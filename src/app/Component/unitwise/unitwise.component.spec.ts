import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitwiseComponent } from './unitwise.component';

describe('UnitwiseComponent', () => {
  let component: UnitwiseComponent;
  let fixture: ComponentFixture<UnitwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
