import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualComponent } from './visual.component';

xdescribe('VisualComponent', () => {
  let component: VisualComponent;
  let fixture: ComponentFixture<VisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
