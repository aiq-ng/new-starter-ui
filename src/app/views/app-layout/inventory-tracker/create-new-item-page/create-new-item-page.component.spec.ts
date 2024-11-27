import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewItemPageComponent } from './create-new-item-page.component';

describe('CreateNewItemPageComponent', () => {
  let component: CreateNewItemPageComponent;
  let fixture: ComponentFixture<CreateNewItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewItemPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
