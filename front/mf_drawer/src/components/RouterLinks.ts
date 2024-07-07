export class RouterLinks {
  private badgeCount: number;

  constructor(count: number) {
    this.badgeCount = count;
  }

  render(): HTMLElement {
    const routersContainer = document.createElement("div");
    routersContainer.classList.add("icon-container");
    routersContainer.innerHTML = `
            <a href="#">
                <h3>Vídeos</h3>
            </a>
            <a href="#">
                <h3>Favoritos</h3>
                <span class="badge">${this.badgeCount}</span>
            </a>
        `;
    return routersContainer;
  }
}
