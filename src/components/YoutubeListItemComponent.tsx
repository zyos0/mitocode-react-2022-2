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
import { Dispatch } from 'react';
import { ActionCreators } from '../store/reducer';
interface YoutubeListItemProps {
    listEntry: YoutubeListItem;
    dispatch: Dispatch<any>;
}

const YoutubeListItemComponent: React.FC<YoutubeListItemProps> = ({
    dispatch,
    listEntry,
}) => {
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
