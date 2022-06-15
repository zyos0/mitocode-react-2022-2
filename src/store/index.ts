import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer as session } from './reducers/session';
import { platesReducer as plates } from './reducers/plates';

export default configureStore({
    reducer: { session, plates },
});
