import { YoutubeListItem } from '../types/YoutubeTypes';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Delete, Edit, Folder} from "@mui/icons-material";
import {getThumbnail} from "../utils/youtubeUtils";
interface YoutubeListItemProps {
    listEntry:YoutubeListItem;
    onUpdate: (updatePayload: YoutubeListItem) => void;
    onDelete: (deletePayload: YoutubeListItem) => void;
}

const YoutubeListItemComponent:React.FC<YoutubeListItemProps> = ({onUpdate, onDelete, listEntry}) => {
    const thumbnailUrl = getThumbnail(listEntry.videoUrl);
    const fallbackIcon = !thumbnailUrl ? (
        listEntry.videoName.slice(0, 1)
    ) : (
        <Folder />
    );
    return (
        <ListItem >
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={() => onDelete(listEntry)}
                >
                    <Delete />
                </IconButton>
                <IconButton
                    edge="end"
                    onClick={() => onUpdate(listEntry)}
                >
                    <Edit />
                </IconButton>
            </ListItemSecondaryAction>
            <ListItemAvatar>
                <Avatar src={thumbnailUrl}>
                    {fallbackIcon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={listEntry.videoName} />
        </ListItem>
    );
};

export default YoutubeListItemComponent;
