import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarascoComponent } from './marasco.component';

describe('MarascoComponent', () => {
  let component: MarascoComponent;
  let fixture: ComponentFixture<MarascoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarascoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
