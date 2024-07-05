import { RouterLinks } from '../components/RouterLinks';

describe('RouterLinks', () => {
    it('should render the routers container with videos and favorites links', () => {
        const badgeCount = 5;
        const routerLinks = new RouterLinks(badgeCount);
        const renderedElement = routerLinks.render();

        expect(renderedElement.tagName).toBe('DIV');

        expect(renderedElement.classList.contains('icon-container')).toBe(true);

        const links = renderedElement.querySelectorAll('a');
        expect(links.length).toBe(2);

        const videosLink = links[0];
        const favoritesLink = links[1];

        expect(videosLink.querySelector('h3')?.textContent).toBe('Vídeos');

        expect(favoritesLink.querySelector('h3')?.textContent).toBe('Favoritos');

        const badge = favoritesLink.querySelector('.badge');
        expect(badge).not.toBeNull();
        expect(badge?.textContent).toBe(badgeCount.toString());
    });
});
