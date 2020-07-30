import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairAddComponent } from './chair-add.component';

describe('ChairAddComponent', () => {
  let component: ChairAddComponent;
  let fixture: ComponentFixture<ChairAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
