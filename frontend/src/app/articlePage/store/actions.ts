import { state } from "@angular/animations";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetArticleResponseInterface } from "../types/getArticleResponse.interface";

export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Get Article': props<{url: string}>(),
        'Get Article Success': props<{article: GetArticleResponseInterface}>(),
        'Get Article Failure': emptyProps(),
    }
});