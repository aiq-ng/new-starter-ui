import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteComponent } from './qoute.component';

describe('QouteComponent', () => {
  let component: QouteComponent;
  let fixture: ComponentFixture<QouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
