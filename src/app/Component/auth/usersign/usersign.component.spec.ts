import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersignComponent } from './usersign.component';

describe('UsersignComponent', () => {
  let component: UsersignComponent;
  let fixture: ComponentFixture<UsersignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
