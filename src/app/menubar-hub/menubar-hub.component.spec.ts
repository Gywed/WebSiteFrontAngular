import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarHubComponent } from './menubar-hub.component';

describe('MenubarHubComponent', () => {
  let component: MenubarHubComponent;
  let fixture: ComponentFixture<MenubarHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenubarHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubarHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
