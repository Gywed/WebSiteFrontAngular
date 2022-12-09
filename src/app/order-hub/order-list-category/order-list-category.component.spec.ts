import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListCategoryComponent } from './order-list-category.component';

describe('OrderListCategoryComponent', () => {
  let component: OrderListCategoryComponent;
  let fixture: ComponentFixture<OrderListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
