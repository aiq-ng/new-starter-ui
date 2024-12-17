import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingVendorsComponent } from './accounting-vendors.component';

describe('AccountingVendorsComponent', () => {
  let component: AccountingVendorsComponent;
  let fixture: ComponentFixture<AccountingVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingVendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
