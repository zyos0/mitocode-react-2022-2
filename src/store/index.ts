import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer as session } from './reducers/session';

export default configureStore({
    reducer: { session },
});
