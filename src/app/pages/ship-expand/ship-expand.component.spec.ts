import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipExpandComponent } from './ship-expand.component';

describe('ShipExpandComponent', () => {
  let component: ShipExpandComponent;
  let fixture: ComponentFixture<ShipExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
