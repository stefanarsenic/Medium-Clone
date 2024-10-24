import { inject, Inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TagsService } from "../services/tags.service";
import { catchError, map, of, switchMap } from "rxjs";
import { TagsResponseInterface } from "../types/tagsResponse.interface";
import { tagsActions } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";

export const getTagsEffect = createEffect((
	actions$ = inject(Actions),
	tagsService: TagsService = inject(TagsService)
) => {
	return actions$.pipe(
		ofType(tagsActions.getTags),
		switchMap(() => {
			return tagsService.getTags().pipe(
				map((tags: TagsResponseInterface) => {
					return tagsActions.getTagsSuccess({tags});
				}),
				catchError((errorResponse: HttpErrorResponse) => {
					return of(tagsActions.getTagsFailure());
				})
			)
		})
	)
}, {functional: true});