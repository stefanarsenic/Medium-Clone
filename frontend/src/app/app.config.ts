import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/reducers';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './auth/store/effects'
import * as feedEffects from './shared/components/feed/store/effects'
import * as tagsEffects from './shared/components/popular-tags/store/effects'
import * as addToFavoritesEffects from './shared/components/add-to-favorites/store/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import { authInterceptor } from './shared/services/authInterceptor';
import { feedFeatureKey, feedReducer } from './shared/components/feed/store/reducers';
import { tagsFeatureKey, tagsReducer } from './shared/components/popular-tags/store/reducers';
import { AddToFavoritesService } from './shared/components/add-to-favorites/services/addToFavorites.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
        router: routerReducer,
      }
    ),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(tagsFeatureKey, tagsReducer),
    provideEffects(
      authEffects,
      feedEffects,
      tagsEffects,
      addToFavoritesEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    AddToFavoritesService
  ] 
};
