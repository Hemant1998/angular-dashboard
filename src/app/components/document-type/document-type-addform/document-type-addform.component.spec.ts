import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeAddformComponent } from './document-type-addform.component';

describe('DocumentTypeAddformComponent', () => {
  let component: DocumentTypeAddformComponent;
  let fixture: ComponentFixture<DocumentTypeAddformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeAddformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeAddformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
