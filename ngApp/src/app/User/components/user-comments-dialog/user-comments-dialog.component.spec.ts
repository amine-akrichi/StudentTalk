import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentsDialogComponent } from './user-comments-dialog.component';

describe('UserCommentsDialogComponent', () => {
  let component: UserCommentsDialogComponent;
  let fixture: ComponentFixture<UserCommentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
