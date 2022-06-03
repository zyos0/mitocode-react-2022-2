import { List } from '@mui/material';

import { YoutubeListItem } from '../types/YoutubeTypes';
import YoutubeListItemComponent from './YoutubeListItemComponent';
import React  from 'react';
import {useList} from "./MainPage";


const YoutubeList = () => {
    // @ts-ignore
    const [state] = useList();
    const { list } = state;
    return (
        <List dense>
            {list.map((listEntry: any) => {
                return (
                    <YoutubeListItemComponent
                        listEntry={listEntry}
                        key={listEntry.id}
                    />
                );
            })}
        </List>
    );
};

export default YoutubeList;
