import axiosInstance from './axiosConfig'; 

async function searchVideos(query) {
    try {
        const response = await axiosInstance.get('/search', {
            params: {
                q: query, 
            },
        });
        return response.data; 
    } catch (error) {
        throw new Error(`Erro ao buscar vídeos: ${error.message}`);
    }
}

export { searchVideos };
