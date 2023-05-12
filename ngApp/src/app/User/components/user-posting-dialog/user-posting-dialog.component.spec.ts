import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostingDialogComponent } from './user-posting-dialog.component';

describe('UserPostingDialogComponent', () => {
  let component: UserPostingDialogComponent;
  let fixture: ComponentFixture<UserPostingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
