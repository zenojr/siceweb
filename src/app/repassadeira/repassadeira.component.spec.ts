import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepassadeiraComponent } from './repassadeira.component';

describe('RepassadeiraComponent', () => {
  let component: RepassadeiraComponent;
  let fixture: ComponentFixture<RepassadeiraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepassadeiraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepassadeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
