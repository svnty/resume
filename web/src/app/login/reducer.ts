import { createReducer, on } from '@ngrx/store';
import { login } from './actions';

export const initialState = 0;

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => {
    console.log('NgRx activated');
    return state + 1;
  }),
);