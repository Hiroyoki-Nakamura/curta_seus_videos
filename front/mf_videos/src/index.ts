import './styles/main.scss'
import { GridContainer } from './components/GridContainer';
import axios from 'axios';

/* const videos = [
    {title: 'Video 1', url: 'url1'},
    {title: 'Video 2', url: 'url2'},
    {title: 'Video 3', url: 'url3'},
    {title: 'Video 4', url: 'url4'},
    {title: 'Video 5', url: 'url5'},
    {title: 'Video 6', url: 'url6'},
    {title: 'Video 7', url: 'url7'},
    {title: 'Video 8', url: 'url8'},
    {title: 'Video 9', url: 'url9'},
    {title: 'Video 10', url: 'url10'},
    {title: 'Video 11', url: 'url11'},
    {title: 'Video 12', url: 'url12'},
    {title: 'Video 13', url: 'url13'},
] */

const gridContainer = new GridContainer('container', 4);
/* gridContainer.setVideos(videos); */

/* document.getElementById('searchButton')?.addEventListener('click', () => {
    const query = (document.getElementById('searchInput') as HTMLInputElement).value;
    gridContainer.searchVideos(query);
}); */

document.getElementById('search-input')?.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const query = (document.getElementById('search-input') as HTMLInputElement).value;
        try {
            const response = await axios.get(`/videos?query=${query}`);
            gridContainer.setVideos(response.data.videos);
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
    }
});

document.getElementById('nextPage')?.addEventListener('click', () => gridContainer.nextPage());
document.getElementById('prevPage')?.addEventListener('click', () => gridContainer.prevPage());