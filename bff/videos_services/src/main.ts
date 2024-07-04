import { searchVideos } from './videosApi';

const main = async () => {
    try {
        const query = 'tigres';
        const videos = await searchVideos(query);
        console.log('Vídeos encontrados:', videos);

    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
    }
};

main();
