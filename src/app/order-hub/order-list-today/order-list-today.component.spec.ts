import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListTodayComponent } from './order-list-today.component';

describe('OrderListTodayComponent', () => {
  let component: OrderListTodayComponent;
  let fixture: ComponentFixture<OrderListTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
