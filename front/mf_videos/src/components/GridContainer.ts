export class GridContainer {
    private grids: HTMLDivElement[];

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
}
