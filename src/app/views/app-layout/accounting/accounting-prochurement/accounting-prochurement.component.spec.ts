import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingProchurementComponent } from './accounting-prochurement.component';

describe('AccountingProchurementComponent', () => {
  let component: AccountingProchurementComponent;
  let fixture: ComponentFixture<AccountingProchurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingProchurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingProchurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
