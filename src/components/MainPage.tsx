import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { Delete, Edit, Folder } from '@mui/icons-material';
import Editor from './Editor';
import { useState } from 'react';

import { YoutubeListItem } from '../types/YoutubeTypes';
import { getThumbnail } from '../utils/youtubeUtils';
import YoutubeList from './YoutubeList';

interface MainPageProps {}
const MainPage: React.FC<MainPageProps> = () => {
    const [list, updateList] = useState<YoutubeListItem[]>([]);
    const [entryToUpdate, setEntryToUpdate] = useState<YoutubeListItem>();

    const handleSave = (newEntry: YoutubeListItem) => {
        if (!entryToUpdate) {
            const newList = list.concat(newEntry);
            updateList(newList);
            return;
        }

        const newList = list.map((entry) =>
            entry.id === newEntry.id ? newEntry : entry
        );
        updateList(newList);
        setEntryToUpdate(undefined);
    };

    const handleDelete = (entryToRemove: YoutubeListItem) => {
        const newList = list.filter((entry) => entry.id !== entryToRemove.id);
        updateList(newList);
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
            <Editor onSubmit={handleSave} entryToUpdate={entryToUpdate} />

            <YoutubeList
                list={list}
                onDelete={handleDelete}
                onUpdate={(entry) => setEntryToUpdate(entry)}
            />
        </Box>
    );
};

export default MainPage;
