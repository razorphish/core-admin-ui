import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiClientListComponent } from './api-client-list.component';

describe('ApiClientListComponent', () => {
  let component: ApiClientListComponent;
  let fixture: ComponentFixture<ApiClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
