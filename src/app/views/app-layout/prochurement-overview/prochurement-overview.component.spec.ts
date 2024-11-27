import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProchurementOverviewComponent } from './prochurement-overview.component';

describe('ProchurementOverviewComponent', () => {
  let component: ProchurementOverviewComponent;
  let fixture: ComponentFixture<ProchurementOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProchurementOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProchurementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
