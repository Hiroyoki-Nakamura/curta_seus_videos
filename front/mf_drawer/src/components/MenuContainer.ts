export class MenuContainer {
  render(): HTMLElement {
    const menuContainer = document.createElement("div");
    menuContainer.innerHTML = `
            <h2>Menu</h2>
        `;
    return menuContainer;
  }
}
