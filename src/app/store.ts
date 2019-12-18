import { Map } from 'immutable';
import { INCREMENT } from './actions';
import { tassign } from 'tassign';

export interface IAppState{
    counter: number;
   
}

export const INITIAL_STATE: IAppState = {
   counter: 0, 
  
}

// REDUX VERSION 2

/** 
export function rootReducer(state: Map<string, any>, action): Map<string, any> {
    switch (action.type){
        case INCREMENT: 
            return state.set('counter', state.get('counter') + 1);
    }
    return state;

}
*/

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type){
        case INCREMENT: 
            return tassign(state, {counter: state.counter +1 })
    }
    return state;

}