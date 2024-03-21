import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserPopupComponent } from './createuser-popup.component';

describe('CreateuserPopupComponent', () => {
  let component: CreateuserPopupComponent;
  let fixture: ComponentFixture<CreateuserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateuserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
