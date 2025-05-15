import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdnpauploadComponent } from './odnpaupload.component';

describe('OdnpauploadComponent', () => {
  let component: OdnpauploadComponent;
  let fixture: ComponentFixture<OdnpauploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdnpauploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdnpauploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
