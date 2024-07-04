export class VideoContainer {
    private content: HTMLDivElement;
    private favorite!: HTMLDivElement;
    private videoKey: string;

    constructor(private videoData: { title: string, url: string }) {
        this.content = document.createElement('div');
        this.content.classList.add('video-content');
        this.videoKey = `favorite_${this.videoData.title}_${this.videoData.url}`;
        this.render();
    }

    private render() {
        const thumbnailUrl = this.videoData.url; 
        
        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailUrl;
        thumbnail.alt = this.videoData.title;
        thumbnail.classList.add('video-thumbnail');
        
        thumbnail.addEventListener('click', () => {
            this.playVideo(this.videoData.url);
        });

        const videoContent = document.createElement('video');
        videoContent.src = this.videoData.url;
        videoContent.controls = true;

        this.favorite = document.createElement('div');
        this.favorite.classList.add('favorite');
        this.favorite.addEventListener('click', () => {
            this.toggleFavorite();
            this.updateFavoriteClass();
        });

        const isFavorite = this.loadFavoriteState();
        this.favorite.classList.toggle('favorite-active', isFavorite);
        this.updateFavoriteClass();

        this.content.appendChild(thumbnail);
        this.content.appendChild(this.favorite);
    }

    private playVideo(videoUrl: string) {
        const playerContainer = document.getElementById('video-player');
        if (playerContainer) {
            playerContainer.innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.extractVideoId(videoUrl)}" frameborder="0" allowfullscreen></iframe>
            `;
        }
    }

    private extractVideoId(videoUrl: string): string {
        const videoId = videoUrl.split('/').pop(); 
        return videoId || '';
    }

    private toggleFavorite() {
        const currentState = this.favorite.classList.contains('favorite-active');
        this.saveFavoriteState(!currentState);
    }

    private updateFavoriteClass() {
        this.favorite.classList.toggle('favorite-active', this.isFavorite());
    }

    private loadFavoriteState(): boolean {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        return favorites[this.videoKey] || false;
    }

    private saveFavoriteState(state: boolean) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
        favorites[this.videoKey] = state;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    public isFavorite(): boolean {
        return this.favorite.classList.contains('favorite-active');
    }

    public getVideo(): HTMLDivElement {
        return this.content;
    }

    public getFavorites(): HTMLDivElement {
        return this.favorite;
    }
}
