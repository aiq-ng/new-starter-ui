import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderPreviewComponent } from './sales-order-preview.component';

describe('SalesOrderPreviewComponent', () => {
  let component: SalesOrderPreviewComponent;
  let fixture: ComponentFixture<SalesOrderPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesOrderPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
