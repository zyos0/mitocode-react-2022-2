import { YoutubeListItem } from '../types/YoutubeTypes';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { Delete, Edit, Folder } from '@mui/icons-material';
import { getThumbnail } from '../utils/youtubeUtils';
import React from 'react';
import { ActionCreators } from '../store/reducer';
import { useList } from './MainPage';

interface YoutubeListItemProps {
    listEntry: YoutubeListItem;
}
const YoutubeListItemComponent: React.FC<YoutubeListItemProps> = ({
    listEntry,
}) => {
    // @ts-ignore
    const [, dispatch] = useList();
    const thumbnailUrl = getThumbnail(listEntry.videoUrl);
    const fallbackIcon = !thumbnailUrl ? (
        listEntry.videoName.slice(0, 1)
    ) : (
        <Folder />
    );
    return (
        <ListItem>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={() => dispatch(ActionCreators.delete(listEntry))}
                >
                    <Delete />
                </IconButton>
                <IconButton
                    edge="end"
                    onClick={() =>
                        dispatch(ActionCreators.startEdit(listEntry))
                    }
                >
                    <Edit />
                </IconButton>
            </ListItemSecondaryAction>
            <ListItemAvatar>
                <Avatar src={thumbnailUrl}>{fallbackIcon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={listEntry.videoName} />
        </ListItem>
    );
};

export default YoutubeListItemComponent;
