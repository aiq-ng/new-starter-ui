import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcurementComponent } from './create-procurement.component';

describe('CreateProcurementComponent', () => {
  let component: CreateProcurementComponent;
  let fixture: ComponentFixture<CreateProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProcurementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
