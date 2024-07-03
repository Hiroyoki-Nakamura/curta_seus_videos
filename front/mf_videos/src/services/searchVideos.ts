const videos_services_ENDPOINT = 'http://localhost:3000';

import axios from 'axios';

export async function fetchVideosFromBFF(query: string): Promise<{ title: string, url: string }[]> {
    try {
        const response = await axios.get(`${videos_services_ENDPOINT}/videos/search?q=${query}`);
        return response.data.videos; 
    } catch (error) {
        console.error('Erro ao buscar vídeos do BFF:', error);
        return []; 
    }
}
