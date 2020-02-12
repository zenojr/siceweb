import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSupComponent } from './login-sup.component';

describe('LoginSupComponent', () => {
  let component: LoginSupComponent;
  let fixture: ComponentFixture<LoginSupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
