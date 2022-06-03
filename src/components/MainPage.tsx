import {

    Box,

} from '@mui/material';

import Editor from './Editor';
import React, { useReducer, useState } from 'react';


import YoutubeList from './YoutubeList';
import {

    youtubeInitialState,
    YoutubeListReducer,
} from '../store/reducer';


export const ListContext = React.createContext(undefined);

export const useList = ()=>{
    const context = React.useContext(ListContext);
    if(!context){
        throw new Error('useList mut be used within ListProvider')
    }
    return context
}

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {


    const ListProvider = (props: any):any => {
        const [state, dispatch] = useReducer(
            YoutubeListReducer,
            youtubeInitialState
        );
        return <ListContext.Provider value={[state, dispatch]} {...props} />;
    };



    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                margin: '0 auto',
                width: 300,
                border: '1px solid blue',
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <ListProvider>
                <Editor />
                <YoutubeList />
            </ListProvider>

        </Box>
    );
};

export default MainPage;
