import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register Success': props<{currentUser: CurrentUserInterface}>(),
    'Register Failure': props<{errors: BackendErrorsInterface}>(),

    Login: props<{request: LoginRequestInterface}>(),
    'Login Success': props<{currentUser: CurrentUserInterface}>(),
    'Login Failure': props<{errors: BackendErrorsInterface}>(),
  },
})
