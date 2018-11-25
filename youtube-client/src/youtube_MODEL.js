import {App_Controller} from './youtube_CONTROLER.js';
import  {App_View} from './youtube_VIEW.js';

const APP_YOUTUBE = new App();
const Y_CONTR = new App_Controller();
const Y_VIEW = new App_View();

APP_YOUTUBE.init(Y_VIEW);
Y_VIEW.init(APP_YOUTUBE);
Y_CONTR.init(APP_YOUTUBE);

class App {
    constructor() {
        this.youtube_view = null;
        this.videoList = [];
        this.videoCounter = 0;
        this.clipsPerPage = 0;
    }

    init(view){
        this.youtube_view = view;
    }

    resize(e){
        if(window.innerWidth < 820){
            this.clipsPerPage = 1;
        } else if (window.innerWidth >= 820 && window.innerWidth < 1140){
            this.clipsPerPage = 2;
        } else {
            this.clipsPerPage = 3;
        }
        this.youtube_view.checkPagination();
    }

    clearVideos(e){
        this.youtube_view.clear_videos();
    }

    addToVideos(arr){
        this.videoList = this.videoList.concat(arr);
        this.youtube_view.draw_videos(this.videoList.slice(-15));
    }

    increaseCounter(n=1){
        this.videoCounter += n;
        this.youtube_view.scrollVideoContainer(this.videoCounter);
    }

    decreaseCounter(n=1){
        if(this.videoCounter > 0){
            this.videoCounter -= n;
            if(this.videoCounter < 0){
                this.videoCounter = 0;
            }
        }
        this.youtube_view.scrollVideoContainer(this.videoCounter);
    }
}