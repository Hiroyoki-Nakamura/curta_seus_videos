import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

interface VideoItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

export const searchVideos = async (query: string): Promise<VideoItem[]> => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: YOUTUBE_API_KEY,
                part: 'snippet',
                type: 'video',
                q: query,
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Error searching videos:', error);
        throw error;
    }
};
