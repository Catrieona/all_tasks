export class App_View {
    constructor() {
        this.model = null;
        this.video_block = document.querySelector(".video__container-allVideos"); 
        this.pagination = document.querySelector(".pagination"); 
    }

    init(model){
        this.model = model;
    }

    draw_videos (data) {
        this.checkPagination();
        
        let nextPage = document.querySelector(".video__container-nextPage");
        let prevPage = document.querySelector(".video__container-prevPage");
        nextPage.style.display="block";
        prevPage.style.display="block";

        
        let fragment=document.createDocumentFragment();
        let video_link=document.createElement("a");
        let video_card=document.createElement("div");
        let title=document.createElement("a");
        let thumbnail=document.createElement("img");
        let card_footer=document.createElement("div");
        let video_statistic=document.createElement("div");
        let video_description=document.createElement("div");
        let video_published=document.createElement("div");
        let video_like=document.createElement("div");
        let video_view=document.createElement("div");
        
        
        video_card.classList.add("videoBlock-card");
        video_statistic.classList.add("video-statistic");
        video_published.classList.add("video-published");
        video_like.classList.add("video-like");
        video_view.classList.add("video-view");
        video_description.classList.add("video-description");
        video_link.classList.add("video-link");
        card_footer.classList.add("card-footer");
        thumbnail.classList.add("videoBlock__card-img");
        title.classList.add("videoBlock__card-title");

        video_card.appendChild(title);
        video_card.appendChild(video_link);
        video_card.appendChild(card_footer);
        card_footer.appendChild(video_statistic);
        card_footer.appendChild(video_description);
        video_statistic.appendChild(video_published);
        video_statistic.appendChild(video_view);
        video_statistic.appendChild(video_like);
        video_link.appendChild(thumbnail);
        
        for (let i=1; i<data.length; i++) {
            const cardClone=video_card.cloneNode(true);

            cardClone.querySelector(".video-like").innerHTML = '<i class="fas fa-heart"></i>' + data[i].statistics.likeCount; 
            cardClone.querySelector(".video-view").innerHTML = '<i class="fas fa-eye"></i>' + data[i].statistics.viewCount;
            cardClone.querySelector(".video-published").innerHTML = '<i class="fas fa-calendar-alt"></i>' + data[i].publishedAt.replace(/T.+/gi, "");
            cardClone.querySelector(".video-description").textContent = data[i].description;
            cardClone.querySelector(".videoBlock__card-title").textContent = data[i].title;
            cardClone.querySelector(".videoBlock__card-title").href = "https://www.youtube.com/watch?v=" + data[i].videoId;
            cardClone.querySelector(".videoBlock__card-img").setAttribute('src', data[i].thumb);
            cardClone.querySelector(".video-link").href = "https://www.youtube.com/watch?v=" + data[i].videoId;
            fragment.appendChild(cardClone);
        }
        this.video_block.appendChild(fragment);
    }

    scrollVideoContainer(num){
        this.video_block.style.marginLeft = -320 * num + "px";
        this.checkPagination();
    }

    clear_videos(){
        document.querySelector(".video__container-allVideos").innerHTML = "";
        this.video_block.style.marginLeft = "0px";
    }

    checkPagination(){
        let crumbs = Math.ceil(this.model.videoList.length / this.model.clipsPerPage);
        let currentPage = Math.ceil(this.model.videoCounter / this.model.clipsPerPage);
        this.pagination.innerHTML = "";

        if(this.model.videoList.length == 0){
            this.pagination.innerHTML = "";
        } else if(crumbs < 11) {
            for(let i = 0; i < crumbs; i++){
                this.pagination.innerHTML += '<div class="pagination-videoPage"></div>';
            }
            if(document.getElementsByClassName('pagination-videoPage')){
                document.getElementsByClassName('pagination-videoPage')[currentPage].classList.add('current');
            }
        } else {
            this.pagination.innerHTML = (this.model.videoCounter+1) + (this.model.videoCounter+1 == this.model.videoCounter + this.model.clipsPerPage ? (" of " + this.model.videoList.length) : (" - " + (this.model.videoCounter + this.model.clipsPerPage) + " of " + this.model.videoList.length)) 
        }
        
    }
}