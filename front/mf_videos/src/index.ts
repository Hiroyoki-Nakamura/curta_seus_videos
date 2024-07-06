import './styles/main.scss';
import { GridContainer } from './components/GridContainer';

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = new GridContainer('container', 4);
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    gridContainer.setVideos([]); 

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            gridContainer.searchVideos(query); 
        }
    });

    document.getElementById('nextPage')?.addEventListener('click', () => gridContainer.nextPage());
    document.getElementById('prevPage')?.addEventListener('click', () => gridContainer.prevPage());
});
