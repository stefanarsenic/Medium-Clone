import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { FeedTogglerComponent } from "../../../shared/components/feed-toggler/feed-toggler.component";
import { FeedComponent } from "../../../shared/components/feed/feed.component";
import { PopularTagsComponent } from "../../../shared/components/popular-tags/popular-tags.component";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  standalone: true,
  imports: [BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagsComponent],
  templateUrl: './tag-feed.component.html',
  styleUrl: './tag-feed.component.css'
})
export class TagFeedComponent implements OnInit{
  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
