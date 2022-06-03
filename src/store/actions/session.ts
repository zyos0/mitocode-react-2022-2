export const SessionActionType = {
    ON_LOGIN_SUCCESS: 'ON_LOGIN_SUCCESS',
    ON_LOGIN_ERROR: 'ON_LOGIN_ERROR',
    TOGGLE_LOGIN_LOADING_STATE: 'TOGGLE_LOGIN_LOADING_STATE',
    RESET_SESSION_STATE: 'RESET_SESSION_STATE',
};

const loginSuccess = (payload: any) => ({
    type: SessionActionType.ON_LOGIN_SUCCESS,
    payload,
});

const loginError = (payload: any) => ({
    type: SessionActionType.ON_LOGIN_ERROR,
    payload,
});

const toggleLoadingState = (payload: any) => ({
    type: SessionActionType.TOGGLE_LOGIN_LOADING_STATE,
    payload,
});

const resetState = () => ({
    type: SessionActionType.RESET_SESSION_STATE,
});

const RemoteRequest = (loginData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ ...loginData });
        }, 2000);
    });
};

const login = (loginData: any) => async (dispatch) => {
    dispatch(toggleLoadingState(true));
    try {
        const response = await RemoteRequest(loginData);
        dispatch(loginSuccess(response));
    } catch (error) {
        dispatch(loginError(error));
    }
    dispatch(toggleLoadingState(false));
};

export const sessionActions = {
    resetState,
    toggleLoadingState,
    loginError,
    loginSuccess,
    login
}