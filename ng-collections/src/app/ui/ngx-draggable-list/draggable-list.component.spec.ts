import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableListComponent } from './draggable-list.component';

describe('DraggableListComponent', () => {
  let component: DraggableListComponent<any>;
  let fixture: ComponentFixture<DraggableListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
