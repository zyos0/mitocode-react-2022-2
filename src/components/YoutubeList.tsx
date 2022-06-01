import { List } from '@mui/material';

import { YoutubeListItem } from '../types/YoutubeTypes';
import YoutubeListItemComponent from './YoutubeListItemComponent';
import {Dispatch} from "react";

interface YoutubeListProps {
    list: YoutubeListItem[];
    dispatch:Dispatch<any>
}

const YoutubeList: React.FC<YoutubeListProps> = ({
    list,
    dispatch
}) => {
    return (
        <List dense>
            {list.map((listEntry) => {
                return (
                    <YoutubeListItemComponent
                        listEntry={listEntry}
                        dispatch={dispatch}
                        key={listEntry.id}
                    />
                );
            })}
        </List>
    );
};

export default YoutubeList;
