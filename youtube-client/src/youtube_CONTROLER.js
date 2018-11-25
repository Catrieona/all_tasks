
export class App_Controller {
   constructor(){
        this.model = null;

        this.maxResult=15;
        this.key="&key=AIzaSyDhqsTjjJvaJUMkFwTfv8bcLTvcm7iROqo";
        this.link="https://www.googleapis.com/youtube/v3/search?";
        this.stats_link = "https://www.googleapis.com/youtube/v3/videos?";
        this.stats_prop = "&part=snippet,statistics";

        this.filterPart="&type=video&part=snippet&maxResults="+ this.maxResult;
        this.nextPageToken = "";

        this.searchform = document.querySelector("form.search_form");
        this.nextPage = document.querySelector(".video__container-nextPage");
        this.prevPage = document.querySelector(".video__container-prevPage");
        this.video_block_wrapper = document.querySelector(".video_block_wrapper");
        this.video_block = document.querySelector(".video__container-allVideos");  
        
        this.selfSwipeStart = this.swipeStart.bind(this);
        this.selfSwipe = this.swipe.bind(this);
        this.selfSwipeEnd = this.swipeEnd.bind(this);
        this.moves = [];
    }

    init(model){
        this.model = model;

        this.searchform.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.search(true);
        });

        this.nextPage.addEventListener('click', () => this.scrollNext());
        this.prevPage.addEventListener('click', () => this.scrollPrev());
        
        this.video_block_wrapper.addEventListener('touchstart', this.selfSwipeStart);
        this.video_block_wrapper.addEventListener('pointerdown', this.selfSwipeStart);

        window.addEventListener('resize', (e) => this.model.resize(e));
        window.addEventListener('load', (e) => this.model.resize(e));
    }

    swipeStart(e){
        e.preventDefault();
        document.body.addEventListener('touchmove', this.selfSwipe);
        document.body.addEventListener('touchend', this.selfSwipeEnd); 

        document.body.addEventListener('pointermove', this.selfSwipe);
        document.body.addEventListener('pointerup', this.selfSwipeEnd);

    };

    swipe(e){
        e.preventDefault();
        this.moves.push(e.touches ? e.touches[0].clientX : e.clientX);
        
    };
 
    checkEnd(){
        if(this.model.videoCounter > this.model.videoList.length - this.model.clipsPerPage*2){
            this.search(false);
        }
    }

    swipeEnd(e){
        e.preventDefault();
        if(this.moves[this.moves.length-1] < this.moves[0]){
            this.scrollNext(1);
        } else if (this.moves[this.moves.length-1] > this.moves[0]){
            this.scrollPrev(1);
        }
        
        this.moves.length = 0;

        document.body.removeEventListener('touchmove', this.selfSwipe);
        document.body.removeEventListener('touchend', this.selfSwipeEnd);

        document.body.removeEventListener('pointermove', this.selfSwipe);
        document.body.removeEventListener('pointerup', this.selfSwipeEnd);
    };

    async search (isNew) {
        if(document.querySelector('#search__form-input').value){
            let queryPart="&q="+document.querySelector('#search__form-input').value.replace(/\s+/g, "+");
            if(isNew){
                this.nextPageToken = "";
                this.model.videoCounter = 0;
                this.model.videoList = [];
                this.model.clearVideos();
            };

            let res = await fetch(this.link + this.key + this.filterPart + queryPart + this.nextPageToken);
            let json = await res.json();
        
            this.nextPageToken = "&pageToken=" + json.nextPageToken;

            let arr = json.items.map(v => ({
                'title': v.snippet.title,
                'videoId' : v.id.videoId, 
                'description': v.snippet.description, 
                'thumb': v.snippet.thumbnails.high.url, 
                'publishedAt': v.snippet.publishedAt
            }));

            let temp = arr.map(v => v.videoId).join(',');
            
            let statsQuery = await fetch(this.stats_link + this.key + this.stats_prop + "&id=" + temp);
            let stats = await statsQuery.json();

            for(let i=0; i<arr.length; i++){
                arr[i].statistics = stats.items[i].statistics;
            }

            this.model.addToVideos(arr);
        }
    }

    scrollNext(num = this.model.clipsPerPage) {
        this.model.increaseCounter(num);
        this.checkEnd();
    }
    scrollPrev(num = this.model.clipsPerPage) {
        this.model.decreaseCounter(num);
    }
}