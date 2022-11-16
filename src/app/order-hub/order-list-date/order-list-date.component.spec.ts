import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListDateComponent } from './order-list-date.component';

describe('OrderListDateComponent', () => {
  let component: OrderListDateComponent;
  let fixture: ComponentFixture<OrderListDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
