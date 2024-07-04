import './styles/main.scss'
import { GridContainer } from './components/GridContainer';
import { fetchVideosFromBFF } from './services/searchVideos';

const gridContainer = new GridContainer('container', 4);

gridContainer.setVideos([]);

const searchInput = document.getElementById('search-input') as HTMLInputElement;
if (searchInput) {
    searchInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query !== '') {
                const searchedVideos = await fetchVideosFromBFF(query);
                gridContainer.setVideos(searchedVideos);
            } else {
                console.log('Digite um termo para buscar vídeos.');
            }
        }
    });
} else {
    console.error('Elemento #search-input não encontrado.');
}

document.getElementById('nextPage')?.addEventListener('click', () => gridContainer.nextPage());
document.getElementById('prevPage')?.addEventListener('click', () => gridContainer.prevPage());
