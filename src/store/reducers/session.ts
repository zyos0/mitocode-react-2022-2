import { SessionActionType } from '../actions/session';

export const getInitialState = () => {
    return {
        authenticated: false,
        authenticationInProgress: false,
        userData: null,
        authenticationError: null,
    };
};

const loginSuccess = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        userData: payload,
    };
};

const loginError = (state, payload) => {
    return {
        ...state,
        authenticationError: payload,
    };
};

const toggleLoadingState = (state, payload) => {
    return {
        ...state,
        authenticationInProgress: payload,
    };
};

const resetState = () => {
    return getInitialState();
};

export const sessionReducer = (state = getInitialState(), action) => {
    const { type, payload } = action;
    switch (type) {
        case SessionActionType.ON_LOGIN_SUCCESS:
            return loginSuccess(state, payload);
        case SessionActionType.ON_LOGIN_ERROR:
            return loginError(state, payload);
        case SessionActionType.RESET_SESSION_STATE:
            return resetState();
        case SessionActionType.TOGGLE_LOGIN_LOADING_STATE:
            return toggleLoadingState(state, payload);
    }
    return state;
};
