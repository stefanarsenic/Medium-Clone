import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectArticleData, selectError, selectIsLoading } from '../../store/reducers';
import { articleActions } from '../../store/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { ErrorMessageComponent } from "../../../shared/components/error-message/error-message.component";
import { TagListComponent } from "../../../shared/components/tag-list/tag-list.component";

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, TagListComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent implements OnInit{

  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
    .select(selectCurrentUser)
    .pipe(filter((currentUser): currentUser is CurrentUserInterface | null => currentUser != undefined))
  }).pipe(map(({article, currentUser}) => {
    if(!article || !currentUser){
      return false;
    }
    return article.author.username === currentUser.username;
  }))

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    article: this.store.select(selectArticleData),
    errorResponse: this.store.select(selectError),
    isAuthor: this.isAuthor$
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const slug = params["slug"] ?? '';
      this.store.dispatch(articleActions.getArticle({url: slug}));
    });
  }
}
