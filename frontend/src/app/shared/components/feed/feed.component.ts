import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { FeedService } from './services/feed.service';
import { AddToFavoritesComponent } from "../add-to-favorites/add-to-favorites.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RouterLink, AsyncPipe, ErrorMessageComponent, LoadingComponent, TagListComponent, AddToFavoritesComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit, OnChanges{
  
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
    private route: ActivatedRoute,
    private feedService: FeedService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    const apiUrlChanged = 
    !changes['apiUrl'].firstChange 
    && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if(apiUrlChanged) {
      this.fetchFeed;
    }
  }

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
