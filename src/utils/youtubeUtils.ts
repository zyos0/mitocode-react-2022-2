export const getThumbnail = (url: string) => {
    const thumbnailTemplateUrl = 'https://img.youtube.com/vi/$id/default.jpg';
    const segments = url.split('=');
    if (segments.length !== 2) {
        return;
    }
    const videoId = segments[1];
    return thumbnailTemplateUrl.replace('$id', videoId);
};
