import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EditArticleService } from "../services/edit-article.service";
import { editArticleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ArticleInterface } from "../../shared/types/article.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ArticleService } from "../../articlePage/services/article.service";

export const getArticleEffect = createEffect((
	actions$ = inject(Actions),
	  articleService: ArticleService = inject(ArticleService)
  ) => {
	  return actions$.pipe(
		  ofType(editArticleActions.getArticle),
		  switchMap(({slug}) => {
			  return articleService.getArticle(slug).pipe(
				  map((article: ArticleInterface) => {
					  return editArticleActions.getArticleSuccess({article});
				  }),
				  catchError(() => {
					  return of(editArticleActions.getArticleFailure());
				  })
			  )
		  })
	  );
  }, {functional: true}
);

export const editArticleEffect = createEffect((
	actions$ = inject(Actions),
	  articleService: EditArticleService = inject(EditArticleService)
  ) => {
        return actions$.pipe(
		  ofType(editArticleActions.editArticle),
		  switchMap(({slug, request}) => {
			  return articleService.editArticle(slug, request).pipe(
				  map((article: ArticleInterface) => {
					  return editArticleActions.editArticleSuccess({article});
				  }),
				  catchError((errorsResponse: HttpErrorResponse) => {
					  return of(editArticleActions.editArticleFailure(errorsResponse.error));
				  })
			  )
		  })
	  );
  }, {functional: true}
);

export const redirectAfterEditEffect = createEffect((
    actions$ = inject(Actions), router = inject(Router)
) => {
		return actions$.pipe(
			ofType(editArticleActions.editArticleSuccess),
			tap(({article}) => {
				router.navigate(['/articles', article.slug]);
			})
		)
	},
	{functional: true, dispatch: false}
);