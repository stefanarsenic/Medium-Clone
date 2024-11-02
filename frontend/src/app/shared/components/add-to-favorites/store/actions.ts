import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleInterface } from "../../../types/article.interface";

export const addToFavoritesActions = createActionGroup({
	source: 'Add to favorites',
	events: {
		'Add to favorites': props<{isFavorited: boolean, slug: string}>(),
		'Add to favorites Success': props<{article: ArticleInterface}>(),
		'Add to favorites Failure': emptyProps(),
	}
})