import { GridContainer } from '../GridContainer';
import { fetchVideosFromBFF, loadMockVideos } from '../../services/searchVideos';
import { VideoContainer } from '../VideoContainer';

jest.mock('../../services/searchVideos', () => ({
   fetchVideosFromBFF: jest.fn(),
    loadMockVideos: jest.fn(),
})); 
jest.mock('../VideoContainer.ts', () => {
    return {
        VideoContainer: jest.fn().mockImplementation((videoData) => {
            return {
                getVideo: jest.fn(() => document.createElement('div')),
                getFavorites: jest.fn(() => document.createElement('div')),
                isFavorite: jest.fn(() => false)
            };
        }),
    };
});

describe('GridContainer', () => {
    let container: GridContainer;
    let containerElement: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="container"></div>
        `;
        containerElement = document.getElementById('container')!;
        container = new GridContainer('container', 2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize grids and pagination container', () => {
        expect(containerElement.querySelectorAll('.grid-item').length).toBe(2);
        expect(containerElement.querySelector('#pagination')).toBeTruthy();
    });

    it('should fetch videos from BFF and render them', async () => {
        const mockVideos = [
            { title: 'Video 1', url: 'url1' },
            { title: 'Video 2', url: 'url2' },
        ];
        (fetchVideosFromBFF as jest.Mock).mockResolvedValue(mockVideos);

        await container.searchVideos('');

        expect(container.getAllVideos()).toEqual(mockVideos);
        expect(containerElement.querySelectorAll('.grid-item').length).toBe(2);
        expect(VideoContainer).toHaveBeenCalledTimes(2);
    });

    it('should handle API error and fallback to mock data', async () => {
        const mockVideos = [
            { title: 'Mock Video 1', url: 'mockUrl1' },
            { title: 'Mock Video 2', url: 'mockUrl2' },
        ];
        (fetchVideosFromBFF as jest.Mock).mockRejectedValue(new Error('API Error'));
        (loadMockVideos as jest.Mock).mockReturnValue(mockVideos);

        await container.searchVideos('');

        expect(container.getAllVideos()).toEqual(mockVideos);
        expect(containerElement.querySelectorAll('.grid-item').length).toBe(2);
        expect(VideoContainer).toHaveBeenCalledTimes(2);
    });

    it('should update displayed videos and pagination on page change', async () => {
        const mockVideos = Array.from({ length: 24 }, (_, i) => ({
            title: `Video ${i + 1}`,
            url: `url${i + 1}`,
        }));
        (fetchVideosFromBFF as jest.Mock).mockResolvedValue(mockVideos);

        await container.searchVideos('');
        expect(container.getDisplayedVideos().length).toBe(12);
        expect(container.getAllVideos().length).toBe(24);

        container.nextPage();
        expect(container.getDisplayedVideos().length).toBe(12);
        expect(container.getDisplayedVideos()[0].title).toBe('Video 13');

        container.prevPage();
        expect(container.getDisplayedVideos().length).toBe(12);
        expect(container.getDisplayedVideos()[0].title).toBe('Video 1');
    });
});
