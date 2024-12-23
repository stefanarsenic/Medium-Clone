import { Component, OnInit } from '@angular/core';
import { ArticleFormValuesInterface } from '../../shared/components/article-form/types/articleFormValues.interface';
import { ArticleFormComponent } from '../../shared/components/article-form/article-form.component';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { selectArticle, selectIsLoading, selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { editArticleActions } from '../store/actions';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from '../../shared/types/article.interface';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent implements OnInit{
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article != null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList
      }
    })
  )
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$
  })

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }
    this.store.dispatch(editArticleActions.editArticle({request, slug: this.slug}));
  }
}
