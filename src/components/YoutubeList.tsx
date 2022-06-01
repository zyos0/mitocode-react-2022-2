import { List } from '@mui/material';

import { YoutubeListItem } from '../types/YoutubeTypes';
import YoutubeListItemComponent from './YoutubeListItemComponent';

interface YoutubeListProps {
    list: YoutubeListItem[];
    onUpdate: (updatePayload: YoutubeListItem) => void;
    onDelete: (deletePayload: YoutubeListItem) => void;
}

const YoutubeList: React.FC<YoutubeListProps> = ({
    list,
    onUpdate,
    onDelete,
}) => {
    return (
        <List dense>
            {list.map((listEntry) => {
                return (
                    <YoutubeListItemComponent
                        listEntry={listEntry}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        key={listEntry.id}
                    />
                );
            })}
        </List>
    );
};

export default YoutubeList;
