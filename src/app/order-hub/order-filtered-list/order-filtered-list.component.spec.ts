import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilteredListComponent } from './order-filtered-list.component';

describe('OrderFilteredListComponent', () => {
  let component: OrderFilteredListComponent;
  let fixture: ComponentFixture<OrderFilteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFilteredListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFilteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
