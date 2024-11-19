import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUploadHeaderComponent } from './search-upload-header.component';

describe('SearchUploadHeaderComponent', () => {
  let component: SearchUploadHeaderComponent;
  let fixture: ComponentFixture<SearchUploadHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchUploadHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUploadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
