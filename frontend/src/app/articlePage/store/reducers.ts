import { createFeature, createReducer, on } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.interface";
import { state } from "@angular/animations";
import { articleActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: ArticleStateInterface = {
	isLoading: false,
	error: null,
	data: null
}

const articleFeature = createFeature({
	name: 'article',
	reducer: createReducer(
		initialState,
		on(articleActions.getArticle, (state) => ({
				...state,
				isLoading: true
		})),
		on(articleActions.getArticleSuccess, (state, action) => ({
			...state,
			isLoading: false,
			data: action.article
		})),		
		on(articleActions.getArticleFailure, (state, action) => ({
			...state,
			isLoading: false,
			data: null,
			error: null
		})),
		on(routerNavigationAction, (state) => initialState)
	)
});

export const {

} = articleFeature;