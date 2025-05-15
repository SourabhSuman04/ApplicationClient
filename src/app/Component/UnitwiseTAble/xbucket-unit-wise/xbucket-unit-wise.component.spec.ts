import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XbucketUnitWiseComponent } from './xbucket-unit-wise.component';

describe('XbucketUnitWiseComponent', () => {
  let component: XbucketUnitWiseComponent;
  let fixture: ComponentFixture<XbucketUnitWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XbucketUnitWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XbucketUnitWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
