import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "../services/article.service";
import { articleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { ArticleInterface } from "../../shared/types/article.interface";

export const getArticleEffects = createEffect((
  actions$ = inject(Actions),
	articleService: ArticleService = inject(ArticleService)
) => {
	return actions$.pipe(
		ofType(articleActions.getArticle),
		switchMap(({url}) => {
			return articleService.getArticle(url).pipe(
				map((article: ArticleInterface) => {
					return articleActions.getArticleSuccess({article});
				}),
				catchError((errorResponse) => {
					return of(articleActions.getArticleFailure());
				})
			)
		})
	);
}, {functional: true});

export const deleteArticleEffect = createEffect((
	actions$ = inject(Actions),
	  articleService: ArticleService = inject(ArticleService)
  ) => {
	  return actions$.pipe(
		  ofType(articleActions.deleteArticle),
		  switchMap(({slug}) => {
			  return articleService.deleteArticle(slug).pipe(
				  map(() => {
					  return articleActions.deleteArticleSuccess();
				  }),
				  catchError(() => {
					  return of(articleActions.deleteArticleFailure());
				  })
			  )
		  })
	  );
  }, {functional: true});

export const redirectAfterDeleteEffect = createEffect(
	(actions$ = inject(Actions), router = inject(Router)) => {
		return actions$.pipe(
			ofType(articleActions.deleteArticleSuccess),
			tap(() => {
				router.navigateByUrl('/');
			})
		)
	},
	{functional: true, dispatch: false});