import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRepComponent } from './select-rep.component';

describe('SelectRepComponent', () => {
  let component: SelectRepComponent;
  let fixture: ComponentFixture<SelectRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
