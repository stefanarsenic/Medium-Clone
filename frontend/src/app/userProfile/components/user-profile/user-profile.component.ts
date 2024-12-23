import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import { selectError, selectIsLoading, selectUserProfileData } from '../../store/reducers';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { UserProfileInterface } from '../../types/userProfile.interface';
import { userProfileActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { FeedComponent } from "../../../shared/components/feed/feed.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FeedComponent, CommonModule, RouterLink, RouterLinkActive, FeedComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  
  slug?: string;

  isCurrentUserProfile$ = combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined)
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface => Boolean(userProfile))
    ),
  }).pipe(map(({currentUser, userProfile}) => {
    return currentUser?.username === userProfile.username;
  }))

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$
  })

  constructor(
    private store: Store, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile()
    })
  }

  fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug ? this.slug : ''}));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites')
    return isFavorites ? `/articles?favorited=${this.slug}` : `/articles?author=${this.slug}`;
  }
}
