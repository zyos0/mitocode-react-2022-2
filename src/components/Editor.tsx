import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { YoutubeListItem } from '../types/YoutubeTypes';
import { v4 as uuidv4 } from 'uuid';

import { ActionCreators } from '../store/reducer';
import { useList } from './MainPage';

const Editor = () => {
    const [videoName, setVideoName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    // @ts-ignore
    const [state, dispatch] = useList();
    const { entryToUpdate } = state;

    const onSubmit = (newEntry: YoutubeListItem) => {
        if (!entryToUpdate) {
            dispatch(ActionCreators.add(newEntry));
            return;
        }

        dispatch(ActionCreators.edit(newEntry));
        dispatch(ActionCreators.startEdit(undefined));
    };

    useEffect(() => {
        if (!entryToUpdate) return;

        setVideoName(entryToUpdate.videoName);
        setVideoUrl(entryToUpdate.videoUrl);
    }, [entryToUpdate]);

    const handleSubmit = () => {
        const partialPayload = { videoName, videoUrl };

        const payload: YoutubeListItem = entryToUpdate
            ? { ...partialPayload, id: entryToUpdate.id }
            : { ...partialPayload, id: uuidv4() };

        onSubmit(payload);
        setVideoUrl('');
        setVideoName('');
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                border: '1 px solid red',
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="video-name"
                    label="Video Name"
                    variant="outlined"
                    onChange={(e) => setVideoName(e.target.value)}
                    value={videoName}
                />
            </div>

            <div>
                <TextField
                    id="video-url"
                    label="Video Url"
                    variant="outlined"
                    onChange={(e) => setVideoUrl(e.target.value)}
                    value={videoUrl}
                />
            </div>

            <div>
                <Button onClick={handleSubmit} variant="contained">
                    {!entryToUpdate ? 'Create new Entry' : 'Update entry'}
                </Button>
            </div>
        </Box>
    );
};

export default Editor;
