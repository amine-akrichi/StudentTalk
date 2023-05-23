import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommentDialogComponent } from './update-comment-dialog.component';

describe('UpdateCommentDialogComponent', () => {
  let component: UpdateCommentDialogComponent;
  let fixture: ComponentFixture<UpdateCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
