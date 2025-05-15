import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XbucketStateWiseComponent } from './xbucket-state-wise.component';

describe('XbucketStateWiseComponent', () => {
  let component: XbucketStateWiseComponent;
  let fixture: ComponentFixture<XbucketStateWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XbucketStateWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XbucketStateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
