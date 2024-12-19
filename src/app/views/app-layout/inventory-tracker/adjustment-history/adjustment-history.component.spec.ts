import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentHistoryComponent } from './adjustment-history.component';

describe('AdjustmentHistoryComponent', () => {
  let component: AdjustmentHistoryComponent;
  let fixture: ComponentFixture<AdjustmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjustmentHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
