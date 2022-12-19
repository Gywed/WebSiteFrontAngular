import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListOfFamiliesComponent } from './article-list-of-families.component';

describe('ArticleListOfFamiliesComponent', () => {
  let component: ArticleListOfFamiliesComponent;
  let fixture: ComponentFixture<ArticleListOfFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListOfFamiliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleListOfFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
