import { MenuContainer } from './components/MenuContainer'
import { RouterLinks } from './components/RouterLinks'

import './styles/main.scss'

function appendComponent(components: HTMLElement, containerId: string) {
    const container = document.getElementById(containerId);
    if(container) {
        container.appendChild(components);
    }
}

const menuContainer = new MenuContainer();
appendComponent(menuContainer.render(), 'menu');

const routerLinks = new RouterLinks(0);
appendComponent(routerLinks.render(), 'router-link' );