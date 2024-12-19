import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePriceListComponent } from './create-price-list.component';

describe('CreatePriceListComponent', () => {
  let component: CreatePriceListComponent;
  let fixture: ComponentFixture<CreatePriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePriceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
