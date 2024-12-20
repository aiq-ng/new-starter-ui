import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingOrderPreviewComponent } from './accounting-order-preview.component';

describe('AccountingOrderPreviewComponent', () => {
  let component: AccountingOrderPreviewComponent;
  let fixture: ComponentFixture<AccountingOrderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingOrderPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingOrderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
