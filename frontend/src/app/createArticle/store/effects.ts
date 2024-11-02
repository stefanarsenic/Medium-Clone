import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CreateArticleService } from "../services/create-article.service";
import { createArticleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ArticleInterface } from "../../shared/types/article.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export const createArticleEffect = createEffect((
	actions$ = inject(Actions),
	  articleService: CreateArticleService = inject(CreateArticleService)
  ) => {
        return actions$.pipe(
		  ofType(createArticleActions.createArticle),
		  switchMap(({request}) => {
			  return articleService.createArticle(request).pipe(
				  map((article: ArticleInterface) => {
					  return createArticleActions.createArticleSuccess({article});
				  }),
				  catchError((errorsResponse: HttpErrorResponse) => {
					  return of(createArticleActions.createArticleFailure(errorsResponse.error));
				  })
			  )
		  })
	  );
  }, {functional: true}
);

export const redirectAfterDeleteEffect = createEffect((
    actions$ = inject(Actions), router = inject(Router)
) => {
		return actions$.pipe(
			ofType(createArticleActions.createArticleSuccess),
			tap(({article}) => {
				router.navigate(['/articles', article.slug]);
			})
		)
	},
	{functional: true, dispatch: false}
);