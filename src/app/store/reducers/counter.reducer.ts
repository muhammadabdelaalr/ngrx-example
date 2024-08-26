import { createReducer, on } from "@ngrx/store";
import * as fromCounterActions from "../actions/counter.action";

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(fromCounterActions.increment, state => state + 1),
  on(fromCounterActions.decrement, (state: number) => state  === 0 ? 0 : (state - 1)),
  on(fromCounterActions.reset, () => initialState)
)

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action)
}
