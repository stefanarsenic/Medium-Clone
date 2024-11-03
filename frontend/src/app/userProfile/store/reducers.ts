import { createFeature, createReducer, on } from "@ngrx/store";
import { UserProfileStateInterface } from "../types/userProfileState.interface";
import { userProfileActions } from "./actions";
import { state } from "@angular/animations";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState: UserProfileStateInterface = {
    data: null,
    isLoading: false,
    error: null    
}

const userProfileFeature = createFeature({
    name: 'userProfile',
    reducer: createReducer(
        initialState,
        on(userProfileActions.getUserProfile, (state) => ({
            ...state,
            isLoading: true
        })),
        on(userProfileActions.getUserProfileSuccess, (state, action) => ({
            ...state,
            data: action.userProfile,
            isLoading: false
        })),
        on(userProfileActions.getUserProfileFailure, (state) => ({
            ...state,
            isLoading: false
        })),
        
        on(routerNavigationAction, () => initialState)
    )
});

export const {
    name: userProfileFeatureKey,
    reducer: userProfileReducer,
    selectData: userProfileData,
    selectIsLoading,
    selectError
} = userProfileFeature