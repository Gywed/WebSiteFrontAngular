import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHubComponent } from './banner-hub.component';

describe('BannerHubComponent', () => {
  let component: BannerHubComponent;
  let fixture: ComponentFixture<BannerHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
