import { VideoContainer } from "./VideoContainer";

export class GridContainer {
    private grids: HTMLDivElement[];
    private currentPage: number;
    private videosPerPage: number;
    private allVideos: {title: string, url: string}[] = [];
    private displayedVideos: {title: string, url: string}[] = []

    constructor(private containerId: string, private numGrids: number){
        this.grids = [];
        this.currentPage = 1;
        this.videosPerPage = numGrids *3;
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
        })
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
