import { Component } from '@angular/core';
import { FeedComponent } from '../../../shared/components/feed/feed.component';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { PopularTagsComponent } from '../../../shared/components/popular-tags/popular-tags.component';
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component';

@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent, PopularTagsComponent, FeedTogglerComponent],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css'
})
export class MyFeedComponent {
  apiUrl = '/articles/feed';
}
