import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingOrdersComponent } from './accounting-orders.component';

describe('AccountingOrdersComponent', () => {
  let component: AccountingOrdersComponent;
  let fixture: ComponentFixture<AccountingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
