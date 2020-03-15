import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmcomponentComponent } from './agmcomponent.component';

describe('AgmcomponentComponent', () => {
  let component: AgmcomponentComponent;
  let fixture: ComponentFixture<AgmcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgmcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
