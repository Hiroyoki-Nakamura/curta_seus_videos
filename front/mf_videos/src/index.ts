import './styles/main.scss'
import { GridContainer } from './components/GridContainer';

const gridContainer = new GridContainer('container', 4)

document.getElementById('searchButton')?.addEventListener('click', () => {
    const query = (document.getElementById('searchInput') as HTMLInputElement).value;
    gridContainer.searchVideos(query);
});




