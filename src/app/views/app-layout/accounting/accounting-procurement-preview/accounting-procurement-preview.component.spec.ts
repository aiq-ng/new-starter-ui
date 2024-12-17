import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingProcurementPreviewComponent } from './accounting-procurement-preview.component';

describe('AccountingProcurementPreviewComponent', () => {
  let component: AccountingProcurementPreviewComponent;
  let fixture: ComponentFixture<AccountingProcurementPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingProcurementPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingProcurementPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
