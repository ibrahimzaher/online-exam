import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgBlurBlobComponent } from './bg-blur-blob.component';

describe('BgBlurBlobComponent', () => {
  let component: BgBlurBlobComponent;
  let fixture: ComponentFixture<BgBlurBlobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgBlurBlobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgBlurBlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
