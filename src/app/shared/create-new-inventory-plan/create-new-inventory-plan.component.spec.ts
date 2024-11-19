import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewInventoryPlanComponent } from './create-new-inventory-plan.component';

describe('CreateNewInventoryPlanComponent', () => {
  let component: CreateNewInventoryPlanComponent;
  let fixture: ComponentFixture<CreateNewInventoryPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewInventoryPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewInventoryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
