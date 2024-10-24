import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TagsResponseInterface } from "../types/tagsResponse.interface";

export const tagsActions = createActionGroup({
    source: 'tags',
    events: {
        'Get Tags': emptyProps(),
        'Get Tags Success': props<{tags: TagsResponseInterface}>(),
        'Get Tags Failure': emptyProps()
    }
});