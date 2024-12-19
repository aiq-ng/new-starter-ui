import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListOverviewComponent } from './price-list-overview.component';

describe('PriceListOverviewComponent', () => {
  let component: PriceListOverviewComponent;
  let fixture: ComponentFixture<PriceListOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceListOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
