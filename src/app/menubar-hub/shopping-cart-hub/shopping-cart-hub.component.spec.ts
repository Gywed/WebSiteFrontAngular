import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartHubComponent } from './shopping-cart-hub.component';

describe('ShoppingCartHubComponent', () => {
  let component: ShoppingCartHubComponent;
  let fixture: ComponentFixture<ShoppingCartHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
