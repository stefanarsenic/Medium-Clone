import { state } from "@angular/animations";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../shared/types/article.interface";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";

export const editArticleActions = createActionGroup({
    source: 'editArticle',
    events: {
        'Get Article': props<{slug: string}>(),
        'Get Article Success': props<{article: ArticleInterface}>(),
        'Get Article Failure': emptyProps(),

        'Edit Article': props<{slug: string, request: ArticleRequestInterface}>(),
        'Edit Article Success': props<{article: ArticleInterface}>(),
        'Edit Article Failure': props<{errors: BackendErrorsInterface}>(),
    }
});