import { Route } from "@angular/router";
import { ArticlePageComponent } from "./components/article-page/article-page.component";
import { provideEffects } from "@ngrx/effects";
import * as articleEffects from './store/effects'
import { provideState } from "@ngrx/store";
import {articleFeatureKey, articleReducer} from './store/reducers'

export const routes: Route[] = [
    {
        path: '',
        component: ArticlePageComponent,
        providers: [
            provideEffects(articleEffects),
            provideState(articleFeatureKey, articleReducer)
        ]
    }
]