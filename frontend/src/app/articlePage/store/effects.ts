import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "../services/article.service";
import { articleActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { GetArticleResponseInterface } from "../types/getArticleResponse.interface";

export const getArticleEffects = createEffect((
  actions$ = inject(Actions),
	articleService: ArticleService = inject(ArticleService)
) => {
	return actions$.pipe(
		ofType(articleActions.getArticle),
		switchMap(({url}) => {
			return articleService.getArticle(url).pipe(
				map((article: GetArticleResponseInterface) => {
					return articleActions.getArticleSuccess({article});
				}),
				catchError((errorResponse) => {
					return of(articleActions.getArticleFailure());
				})
			)
		})
	);
});