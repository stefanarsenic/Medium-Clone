import { Routes } from '@angular/router';
import {RegisterComponent} from './auth/components/register/register.component';
import {LoginComponent} from './auth/components/login/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./globalFeed/globalFeed.routes').then((m) => m.routes)
  },
  {
    path: 'myFeed',
    loadChildren: () => 
      import('./myFeed/myFeed.routes').then((m) => m.routes)
  },
  {
    path: 'tags/:slug',
    loadChildren: () => 
      import('./tagFeed/tagFeed.routes').then((m) => m.routes)
  },
  {
    path: 'articles/new',
    loadChildren: () => 
      import('./createArticle/createArticle.routes').then((m) => m.routes)
  },
  {
    path: 'articles/:slug',
    loadChildren: () => 
      import('./articlePage/article-page.routes').then((m) => m.routes)
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () => 
      import('./editArticle/editArticle.routes').then((m) => m.routes)
  },
  {
    path: 'settings',
    loadChildren: () => 
      import('./settings/settings.routes').then((m) => m.routes)
  },
];
