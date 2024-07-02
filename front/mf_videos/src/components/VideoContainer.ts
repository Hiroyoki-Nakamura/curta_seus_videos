export class VideoContainer {
    private content: HTMLDivElement;
    private favorite!: HTMLDivElement;

    constructor(private videoData: {title: string, url: string}){
    this.content = document.createElement('div');
    this.content.classList.add('video-content');
    this.render()
    }

    private render(){
        const videoTitle = document.createElement('h3')
        videoTitle.textContent = this.videoData.title;
        
        const videoContent = document.createElement('video');
        videoContent.src = this.videoData.url;
        videoContent.controls = true;

        this.favorite = document.createElement('div');
        this.favorite.classList.add('favorite');

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

        this.content.appendChild(videoTitle);
        this.content.appendChild(videoContent);
        this.content.appendChild(this.favorite);
    }

    getVideo(): HTMLDivElement {
        return this.content;
    }

    getFavorites(): HTMLDivElement {
        return this.favorite;
    }

    isFavorite(): boolean {
        return this.favorite.classList.contains('favorite-active');
    }

}