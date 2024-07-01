export class VideoContainer {
    private content: HTMLDivElement;

    constructor(private videoData: {title: string, url: string}){
    this.content = document.createElement('div');
    this.content.classList.add('video-content');
    this.render()
    }

    private render(){
        const videoTitle = document.createElement('h3')
        videoTitle.textContent = this.videoData.title;
        
        const videoContent = document.createElement('video');
        videoContent.src = this.videoData.url;
        videoContent.controls = true;

        this.content.appendChild(videoTitle);
        this.content.appendChild(videoContent);
    }

    getVideo(): HTMLDivElement {
        return this.content;
    }

}