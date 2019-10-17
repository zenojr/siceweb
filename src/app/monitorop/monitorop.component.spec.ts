import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoropComponent } from './monitorop.component';

describe('MonitoropComponent', () => {
  let component: MonitoropComponent;
  let fixture: ComponentFixture<MonitoropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
