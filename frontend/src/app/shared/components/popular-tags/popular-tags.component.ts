import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectTagsData } from './store/reducers';
import { AsyncPipe, CommonModule } from '@angular/common';
import { tagsActions } from './store/actions';
import { LoadingComponent } from "../../loading/loading.component";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, LoadingComponent, ErrorMessageComponent],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.css'
})
export class PopularTagsComponent implements OnInit{

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tagsData: this.store.select(selectTagsData)
  });

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags() {
    this.store.dispatch(tagsActions.getTags());
  }
}
