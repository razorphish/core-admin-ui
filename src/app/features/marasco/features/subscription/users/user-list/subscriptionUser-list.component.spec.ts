import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionUserListComponent } from './subscriptionUser-list.component';

describe('SubscriptionUserComponent', () => {
  let component: SubscriptionUserListComponent;
  let fixture: ComponentFixture<SubscriptionUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionUserListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
