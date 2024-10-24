import { createFeature, createReducer, emptyProps, on } from "@ngrx/store";
import { TagsStateInterface } from "../types/tagsState.interface";
import { tagsActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: TagsStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

export const tagsFeature = createFeature({
    name: 'tags',
    reducer: createReducer(
        initialState,
        on(tagsActions.getTags, (state) => ({...state, isLoading: true})),
        on(tagsActions.getTagsSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            data: action.tags
        })),
        on(tagsActions.getTagsFailure, (state, action) => ({
            ...state,
            isLoading: false,
            error: null
        })),
        // on(routerNavigationAction, () => initialState)
    ),
});

export const {
    name: tagsFeatureKey,
    reducer: tagsReducer,
    selectIsLoading,
    selectError,
    selectData: selectTagsData
} = tagsFeature;