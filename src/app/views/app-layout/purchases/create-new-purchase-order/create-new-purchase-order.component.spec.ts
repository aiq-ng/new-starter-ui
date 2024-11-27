import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPurchaseOrderComponent } from './create-new-purchase-order.component';

describe('CreateNewPurchaseOrderComponent', () => {
  let component: CreateNewPurchaseOrderComponent;
  let fixture: ComponentFixture<CreateNewPurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewPurchaseOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
