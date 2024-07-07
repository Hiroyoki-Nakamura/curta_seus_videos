import { VideoContainer } from "./VideoContainer";
import { fetchVideosFromBFF, loadMockVideos } from "../services/searchVideos";

export class GridContainer {
  private grids: HTMLDivElement[];
  private currentPage: number;
  private videosPerPage: number;
  private allVideos: { title: string; url: string }[] = [];
  private displayedVideos: { title: string; url: string }[] = [];
  private paginationContainer!: HTMLDivElement;

  constructor(private containerId: string, private numGrids: number) {
    this.grids = [];
    this.currentPage = 1;
    this.videosPerPage = 12;
    this.initGrids();
  }

  public getAllVideos(): { title: string; url: string }[] {
    return this.allVideos;
  }

  public getDisplayedVideos(): { title: string; url: string }[] {
    return this.displayedVideos;
  }

  private initGrids() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    for (let i = 0; i < this.numGrids; i++) {
      const grid = document.createElement("div");
      grid.classList.add("grid-item");
      container.appendChild(grid);
      this.grids.push(grid);
    }

    this.paginationContainer = document.createElement("div");
    this.paginationContainer.id = "pagination";
    container.appendChild(this.paginationContainer);
  }

  public async setVideos(videos: { title: string; url: string }[]) {
    this.allVideos = videos;
    await this.searchVideos("");
  }

  public async searchVideos(query: string) {
    try {
      const videos = await fetchVideosFromBFF(query, true);
      this.allVideos = videos;
      this.displayedVideos = this.allVideos.slice(0, this.videosPerPage);
      this.currentPage = 1;
      this.renderVideos();
    } catch (error) {
      console.error("Erro ao buscar vídeos da API:", error);
      console.warn("Usando dados de mock.");
      this.allVideos = loadMockVideos(query);
      this.displayedVideos = this.allVideos.slice(0, this.videosPerPage);
      this.currentPage = 1;
      this.renderVideos();
    }
  }

  public renderVideos() {
    const start = (this.currentPage - 1) * this.videosPerPage;
    const end = start + this.videosPerPage;
    this.displayedVideos = this.allVideos.slice(start, end);

    this.grids.forEach((grid) => (grid.innerHTML = ""));
    this.displayedVideos.forEach((videoData, index) => {
      const grid = this.grids[index % this.numGrids];
      const videoComponent = new VideoContainer(videoData);
      grid.appendChild(videoComponent.getVideo());

      const favorite = videoComponent.getFavorites();
      favorite.addEventListener("click", () => {
        if (videoComponent.isFavorite()) {
          favorite.classList.remove("favorite-active");
        } else {
          favorite.classList.add("favorite-active");
        }
      });
    });

    this.renderPagination();
  }

  private renderPagination() {
    const allPages = Math.ceil(this.allVideos.length / this.videosPerPage);
    this.paginationContainer.innerHTML = "";

    const createPageButton = (page: number, text: string) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.className = page === this.currentPage ? "active" : "";
      button.addEventListener("click", () => {
        this.currentPage = page;
        this.renderVideos();
      });
      return button;
    };

    if (allPages <= 3) {
      for (let i = 1; i <= allPages; i++) {
        this.paginationContainer.appendChild(createPageButton(i, i.toString()));
      }
    } else {
      if (this.currentPage > 1) {
        this.paginationContainer.appendChild(createPageButton(1, "1"));
        if (this.currentPage > 2) {
          this.paginationContainer.appendChild(
            createPageButton(this.currentPage - 1, "...")
          );
        }
      }

      this.paginationContainer.appendChild(
        createPageButton(this.currentPage, this.currentPage.toString())
      );

      if (this.currentPage < allPages) {
        if (this.currentPage < allPages - 1) {
          this.paginationContainer.appendChild(
            createPageButton(this.currentPage + 1, "...")
          );
        }
        this.paginationContainer.appendChild(
          createPageButton(allPages, allPages.toString())
        );
      }
    }
  }

  public nextPage() {
    if (this.currentPage * this.videosPerPage < this.allVideos.length) {
      this.currentPage++;
      this.renderVideos();
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderVideos();
    }
  }
}
