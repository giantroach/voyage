import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipConfigComponent } from './ship-config.component';

describe('ShipConfigComponent', () => {
  let component: ShipConfigComponent;
  let fixture: ComponentFixture<ShipConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
