import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListArticleComponent } from './admin-list-article.component';

describe('AdminListArticleComponent', () => {
  let component: AdminListArticleComponent;
  let fixture: ComponentFixture<AdminListArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
