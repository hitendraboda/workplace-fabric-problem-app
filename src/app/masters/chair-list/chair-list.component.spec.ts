import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairListComponent } from './chair-list.component';

describe('ChairListComponent', () => {
  let component: ChairListComponent;
  let fixture: ComponentFixture<ChairListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
