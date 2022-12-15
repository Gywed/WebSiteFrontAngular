import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHubComponent } from './family-hub.component';

describe('FamilyHubComponent', () => {
  let component: FamilyHubComponent;
  let fixture: ComponentFixture<FamilyHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyHubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
