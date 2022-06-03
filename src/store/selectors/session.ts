import { createSelector } from '@reduxjs/toolkit';

export const sessionStateSelector = (state: any) => state.session;
export const authenticationInProgressSelector = createSelector(
    sessionStateSelector,
    (sessionState) => {
        return sessionState.authenticationInProgress;
    }
);
