    const videos_services_ENDPOINT = 'http://localhost:3000';

    import axios from 'axios';
    
    export async function fetchVideosFromBFF(query: string): Promise<{ title: string, url: string }[]> {
        try {
            const response = await axios.get(`${videos_services_ENDPOINT}/videos?q=${query}`);
            return response.data.items.map((item: any) => ({
                title: item.snippet.title,
                url: item.snippet.thumbnails.medium.url
            }));
        } catch (error) {
            console.error('Erro ao buscar vídeos do BFF:', error);
            return []; 
        }
    }
    
