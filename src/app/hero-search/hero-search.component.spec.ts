import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HereSearchComponent } from './here-search.component';

describe('HereSearchComponent', () => {
  let component: HereSearchComponent;
  let fixture: ComponentFixture<HereSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HereSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HereSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
