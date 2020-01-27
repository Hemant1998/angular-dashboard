import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFormDialogComponent } from './document-form-dialog.component';

describe('DocumentFormDialogComponent', () => {
  let component: DocumentFormDialogComponent;
  let fixture: ComponentFixture<DocumentFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
