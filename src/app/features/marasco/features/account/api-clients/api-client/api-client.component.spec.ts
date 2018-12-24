import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiClientComponent } from './api-client.component';

describe('ApiClientComponent', () => {
  let component: ApiClientComponent;
  let fixture: ComponentFixture<ApiClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
