import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from './shared/components/top-bar/top-bar.component';
import { authActions } from './auth/store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
