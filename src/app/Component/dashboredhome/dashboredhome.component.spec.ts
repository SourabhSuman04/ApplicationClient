import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredhomeComponent } from './dashboredhome.component';

describe('DashboredhomeComponent', () => {
  let component: DashboredhomeComponent;
  let fixture: ComponentFixture<DashboredhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboredhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboredhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
