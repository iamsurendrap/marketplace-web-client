import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPreviewComponent } from './ad-preview.component';

describe('AdPreviewComponent', () => {
  let component: AdPreviewComponent;
  let fixture: ComponentFixture<AdPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
