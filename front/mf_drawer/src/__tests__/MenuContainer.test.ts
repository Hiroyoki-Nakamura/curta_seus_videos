import { MenuContainer } from '../components/MenuContainer';

describe('MenuContainer', () => {
    it('should render the menu container with a title', () => {
        const menuContainer = new MenuContainer();
        const renderedElement = menuContainer.render();

        expect(renderedElement.tagName).toBe('DIV');

        expect(renderedElement.innerHTML).toContain('<h2>Menu</h2>');
    });
});
