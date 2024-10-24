import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectFeedData, selectError, selectIsLoading } from './store/reducers';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LoadingComponent } from "../../loading/loading.component";
import { environment } from '../../../../environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import queryString from 'query-string';
import { TagListComponent } from "../tag-list/tag-list.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RouterLink, AsyncPipe, ErrorMessageComponent, LoadingComponent, TagListComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  limit: number = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query
    }); 
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
