import { state } from "@angular/animations";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleResponseInterface } from "../types/ArticleResponse.interface";
import { ArticleInterface } from "../../shared/types/article.interface";

export const articleActions = createActionGroup({
    source: 'article',
    events: {
        'Get Article': props<{url: string}>(),
        'Get Article Success': props<{article: ArticleInterface}>(),
        'Get Article Failure': emptyProps(),

        'Delete Article': props<{slug: string}>(),
        'Delete Article Success': emptyProps(),
        'Delete Article Failure': emptyProps(),
    }
});