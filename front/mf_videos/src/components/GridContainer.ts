import { VideoContainer } from "./VideoContainer";

export class GridContainer {
    private grids: HTMLDivElement[];
    private currentPage: number;
    private videosPerPage: number;
    private allVideos: {title: string, url: string}[] = [];
    private displayedVideos: {title: string, url: string}[] = [];
    private paginationContainer!: HTMLDivElement;

    constructor(private containerId: string, private numGrids: number){
        this.grids = [];
        this.currentPage = 1;
        this.videosPerPage = numGrids * 3;
        this.initGrids();
    }

    private initGrids(){
        const container = document.getElementById(this.containerId);
        if (!container) return;

        for(let i = 0; i < this.numGrids; i++){
            const grid = document.createElement('div');
            grid.classList.add('grid-item');
            container.appendChild(grid);
            this.grids.push(grid);
        }

        
    this.paginationContainer = document.createElement('div');
    this.paginationContainer.id = 'pagination';
    container.appendChild(this.paginationContainer);
    }


    public setVideos(videos: {title: string, url: string}[]) {
        this.allVideos = videos;
        this.searchVideos('');
    }

    public searchVideos(query: string) {
        this.displayedVideos = this.allVideos.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.renderVideos();
    }

    public renderVideos() {
        const start = (this.currentPage -1) * this.videosPerPage;
        const end = start + this.videosPerPage;
        const videosToRender = this.displayedVideos.slice(start, end);

        this.grids.forEach(grid => grid.innerHTML = '');

        videosToRender.forEach((videoData, index) => {
            const grid = this.grids[index % this.numGrids];
            const videoComponent = new VideoContainer(videoData);
            grid.appendChild(videoComponent.getVideo())

            const favorite = videoComponent.getFavorites();
            favorite.addEventListener('click', () => {
                if(videoComponent.isFavorite()) {
                    favorite.classList.remove('favorite-active');
                } else {
                    favorite.classList.add('favorite-active');
                }
            })
        })
        this.renderPagination()
    }

    private renderPagination() {
        const allPages = Math.ceil(this.displayedVideos.length / this.videosPerPage);
        this.paginationContainer.innerHTML = '';

        const createPageButton = (page: number, text: string) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.className = (page === this.currentPage) ? 'active' : '';
            button.addEventListener('click', () =>{
                this.currentPage = page;
                this.renderVideos();
            })
            return button;
        }
        if (allPages <= 3){
            for (let i =1; i <= allPages; i++){
                this.paginationContainer.appendChild(createPageButton(i, i.toString()));
            }
        } else {
            if (this.currentPage > 1) {
                this.paginationContainer.appendChild(createPageButton(1,'1'));
                if (this.currentPage > 2) {
                    this.paginationContainer.appendChild(createPageButton(this.currentPage -1, '...'))
                }
            }

            this.paginationContainer.appendChild(createPageButton(this.currentPage, this.currentPage.toString()))

            if(this.currentPage < allPages) {
                if(this.currentPage < allPages -1) {
                    this.paginationContainer.appendChild(createPageButton(this.currentPage + 1, '...'))
                }
                this.paginationContainer.appendChild(createPageButton(allPages, allPages.toString()))
            }
        }
    }

    public nextPage() {
        if((this.currentPage * this.videosPerPage) < this.displayedVideos.length){
            this.currentPage++;
            this.renderVideos();
        }
    }

    public prevPage() {
        if(this.currentPage > 1) {
            this.currentPage--;
            this.renderVideos();
        }
    }
}
