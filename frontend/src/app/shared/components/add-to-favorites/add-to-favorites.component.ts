import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AddToFavoritesService } from './services/addToFavorites.service';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/actions';

@Component({
  selector: 'app-add-to-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.css'
})
export class AddToFavoritesComponent implements OnInit{
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  buttonText: string = 'Favorite';

  ngOnInit(): void {
    if(this.isFavorited){
      this.buttonText = 'Unfavorite';
    }
  }

  handleLike(): void {
    this.store.dispatch(addToFavoritesActions.addToFavorites({
      isFavorited: this.isFavorited,
      slug: this.articleSlug
    }));

    if(!this.isFavorited){
      this.favoritesCount = this.favoritesCount + 1;
      this.buttonText = 'Unfavorite';
    }
    else {
      this.favoritesCount = this.favoritesCount - 1;
      this.buttonText = 'Favorite';
    }

    this.isFavorited = !this.isFavorited;
  }
}
