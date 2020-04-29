import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipVisualComponent } from './ship-visual.component';

describe('ShipVisualComponent', () => {
  let component: ShipVisualComponent;
  let fixture: ComponentFixture<ShipVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
