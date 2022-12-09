import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHubComponent } from './category-hub.component';

describe('CategoryHubComponent', () => {
  let component: CategoryHubComponent;
  let fixture: ComponentFixture<CategoryHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
