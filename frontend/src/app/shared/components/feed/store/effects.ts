import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { feedActions } from "./actions";
import { FeedService } from "../services/feed.service";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";

export const getFeedEffect = createEffect((
    actions$ = inject(Actions),
    feedService: FeedService = inject(FeedService),
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(feedActions.getFeedFailure());
          })
        )
      })
    )
  }, {functional: true})