import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { YoutubeListItem } from '../types/YoutubeTypes';
import { v4 as uuidv4 } from 'uuid';

interface EditorProps {
    onSubmit: (payload: YoutubeListItem) => void;
    entryToUpdate?: YoutubeListItem;
}
const Editor: React.FC<EditorProps> = ({ onSubmit, entryToUpdate }) => {
    const [videoName, setVideoName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

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
