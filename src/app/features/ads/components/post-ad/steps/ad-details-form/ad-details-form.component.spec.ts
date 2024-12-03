import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailsFormComponent } from './ad-details-form.component';

describe('AdDetailsFormComponent', () => {
  let component: AdDetailsFormComponent;
  let fixture: ComponentFixture<AdDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
