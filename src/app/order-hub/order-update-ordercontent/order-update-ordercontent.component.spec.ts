import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdateOrdercontentComponent } from './order-update-ordercontent.component';

describe('OrderUpdateOrdercontentComponent', () => {
  let component: OrderUpdateOrdercontentComponent;
  let fixture: ComponentFixture<OrderUpdateOrdercontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUpdateOrdercontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUpdateOrdercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
