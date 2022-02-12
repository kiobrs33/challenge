import { types } from "../types/types";

export const ChallengeReducer = (state = {}, action) => {
    switch (action.type) {
        case types.start:
            return { ...state, loading: true };
        case types.loaded:
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.payload],
                more: action.payload.length === state.numberData,
            };
        case types.initial:
            return {
                ...state,
                data: [],
                more: false,
            };
        
        default:
            return state;
    }
}