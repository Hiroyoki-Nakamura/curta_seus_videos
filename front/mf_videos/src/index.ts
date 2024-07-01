import './styles/main.scss'
import { GridContainer } from './components/GridContainer';

const videos = [
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
]

const gridContainer = new GridContainer('container', 4);
gridContainer.setVideos(videos);

document.getElementById('searchButton')?.addEventListener('click', () => {
    const query = (document.getElementById('searchInput') as HTMLInputElement).value;
    gridContainer.searchVideos(query);
});

document.addEventListener('DOMContentLoaded', () => {
    const favorite = document.getElementById('favorite') as HTMLElement;
    console.log('ola');

    if (favorite) {
        console.log('Elemento favoriteStar encontrado');

        favorite.addEventListener('click', () => {
            console.log('Elemento favorito clicado');
            if (favorite.classList.contains('favorite-active')) {
                console.log('Removendo a classe active');
                favorite.classList.remove('favorite-active');
                favorite.classList.add('favorite');
            } else {
                console.log('Adicionando a classe active');
                favorite.classList.remove('favorite');
                favorite.classList.add('favorite-active');
            }
        });
    } else {
        console.log('Elemento favoriteStar não encontrado');
    }
});

document.getElementById('nextPage')?.addEventListener('click', () => gridContainer.nextPage());
document.getElementById('prevPage')?.addEventListener('click', () => gridContainer.prevPage());