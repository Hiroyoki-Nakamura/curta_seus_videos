import { VideoContainer } from "./VideoContainer";

export class GridContainer {
    private grids: HTMLDivElement[];
    private allVideos: {title: string, url: string}[] = [];
    private displayedVideos: {title: string, url: string}[] = []

    constructor(private containerId: string, private numGrids: number){
        this.grids = [];
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
        this.renderVideos();
    }

    public renderVideos() {
        
        this.grids.forEach(grid => grid.innerHTML = '');

        this.displayedVideos.forEach((videoData, index) => {
            const grid = this.grids[index % this.numGrids];
            const videoComponent = new VideoContainer(videoData);
            grid.appendChild(videoComponent.getVideo())
        })
    }
}
