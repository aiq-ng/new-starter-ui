import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderInvoiceComponent } from './sales-order-invoice.component';

describe('SalesOrderInvoiceComponent', () => {
  let component: SalesOrderInvoiceComponent;
  let fixture: ComponentFixture<SalesOrderInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesOrderInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
