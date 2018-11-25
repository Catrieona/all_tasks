!function(e){var t={};function i(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(o,s,function(t){return e[t]}.bind(null,s));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);const o=new class{constructor(){this.youtube_view=null,this.videoList=[],this.videoCounter=0,this.clipsPerPage=0}init(e){this.youtube_view=e}resize(e){window.innerWidth<820?this.clipsPerPage=1:window.innerWidth>=820&&window.innerWidth<1140?this.clipsPerPage=2:this.clipsPerPage=3,this.youtube_view.checkPagination()}clearVideos(e){this.youtube_view.clear_videos()}addToVideos(e){this.videoList=this.videoList.concat(e),this.youtube_view.draw_videos(this.videoList.slice(-15))}increaseCounter(e=1){this.videoCounter+=e,this.youtube_view.scrollVideoContainer(this.videoCounter)}decreaseCounter(e=1){this.videoCounter>0&&(this.videoCounter-=e,this.videoCounter<0&&(this.videoCounter=0)),this.youtube_view.scrollVideoContainer(this.videoCounter)}},s=new class{constructor(){this.model=null,this.maxResult=15,this.key="&key=AIzaSyDhqsTjjJvaJUMkFwTfv8bcLTvcm7iROqo",this.link="https://www.googleapis.com/youtube/v3/search?",this.stats_link="https://www.googleapis.com/youtube/v3/videos?",this.stats_prop="&part=snippet,statistics",this.filterPart="&type=video&part=snippet&maxResults="+this.maxResult,this.nextPageToken="",this.searchform=document.querySelector("form.search_form"),this.nextPage=document.querySelector(".video__container-nextPage"),this.prevPage=document.querySelector(".video__container-prevPage"),this.video_block_wrapper=document.querySelector(".video_block_wrapper"),this.video_block=document.querySelector(".video__container-allVideos"),this.selfSwipeStart=this.swipeStart.bind(this),this.selfSwipe=this.swipe.bind(this),this.selfSwipeEnd=this.swipeEnd.bind(this),this.moves=[]}init(e){this.model=e,this.searchform.addEventListener("submit",e=>{e.preventDefault(),this.search(!0)}),this.nextPage.addEventListener("click",()=>this.scrollNext()),this.prevPage.addEventListener("click",()=>this.scrollPrev()),this.video_block_wrapper.addEventListener("touchstart",this.selfSwipeStart),this.video_block_wrapper.addEventListener("pointerdown",this.selfSwipeStart),window.addEventListener("resize",e=>this.model.resize(e)),window.addEventListener("load",e=>this.model.resize(e))}swipeStart(e){e.preventDefault(),document.body.addEventListener("touchmove",this.selfSwipe),document.body.addEventListener("touchend",this.selfSwipeEnd),document.body.addEventListener("pointermove",this.selfSwipe),document.body.addEventListener("pointerup",this.selfSwipeEnd)}swipe(e){e.preventDefault(),this.moves.push(e.touches?e.touches[0].clientX:e.clientX)}checkEnd(){this.model.videoCounter>this.model.videoList.length-2*this.model.clipsPerPage&&this.search(!1)}swipeEnd(e){e.preventDefault(),this.moves[this.moves.length-1]<this.moves[0]?this.scrollNext(1):this.moves[this.moves.length-1]>this.moves[0]&&this.scrollPrev(1),this.moves.length=0,document.body.removeEventListener("touchmove",this.selfSwipe),document.body.removeEventListener("touchend",this.selfSwipeEnd),document.body.removeEventListener("pointermove",this.selfSwipe),document.body.removeEventListener("pointerup",this.selfSwipeEnd)}async search(e){if(document.querySelector("#search__form-input").value){let t="&q="+document.querySelector("#search__form-input").value.replace(/\s+/g,"+");e&&(this.nextPageToken="",this.model.videoCounter=0,this.model.videoList=[],this.model.clearVideos());let i=await fetch(this.link+this.key+this.filterPart+t+this.nextPageToken),o=await i.json();this.nextPageToken="&pageToken="+o.nextPageToken;let s=o.items.map(e=>({title:e.snippet.title,videoId:e.id.videoId,description:e.snippet.description,thumb:e.snippet.thumbnails.high.url,publishedAt:e.snippet.publishedAt})),n=s.map(e=>e.videoId).join(","),d=await fetch(this.stats_link+this.key+this.stats_prop+"&id="+n),r=await d.json();for(let e=0;e<s.length;e++)s[e].statistics=r.items[e].statistics;this.model.addToVideos(s)}}scrollNext(e=this.model.clipsPerPage){this.model.increaseCounter(e),this.checkEnd()}scrollPrev(e=this.model.clipsPerPage){this.model.decreaseCounter(e)}},n=new class{constructor(){this.model=null,this.video_block=document.querySelector(".video__container-allVideos"),this.pagination=document.querySelector(".pagination")}init(e){this.model=e}draw_videos(e){this.checkPagination();let t=document.querySelector(".video__container-nextPage"),i=document.querySelector(".video__container-prevPage");t.style.display="block",i.style.display="block";let o=document.createDocumentFragment(),s=document.createElement("a"),n=document.createElement("div"),d=document.createElement("a"),r=document.createElement("img"),l=document.createElement("div"),a=document.createElement("div"),c=document.createElement("div"),h=document.createElement("div"),u=document.createElement("div"),v=document.createElement("div");n.classList.add("videoBlock-card"),a.classList.add("video-statistic"),h.classList.add("video-published"),u.classList.add("video-like"),v.classList.add("video-view"),c.classList.add("video-description"),s.classList.add("video-link"),l.classList.add("card-footer"),r.classList.add("videoBlock__card-img"),d.classList.add("videoBlock__card-title"),n.appendChild(d),n.appendChild(s),n.appendChild(l),l.appendChild(a),l.appendChild(c),a.appendChild(h),a.appendChild(v),a.appendChild(u),s.appendChild(r);for(let t=1;t<e.length;t++){const i=n.cloneNode(!0);i.querySelector(".video-like").innerHTML='<i class="fas fa-heart"></i>'+e[t].statistics.likeCount,i.querySelector(".video-view").innerHTML='<i class="fas fa-eye"></i>'+e[t].statistics.viewCount,i.querySelector(".video-published").innerHTML='<i class="fas fa-calendar-alt"></i>'+e[t].publishedAt.replace(/T.+/gi,""),i.querySelector(".video-description").textContent=e[t].description,i.querySelector(".videoBlock__card-title").textContent=e[t].title,i.querySelector(".videoBlock__card-title").href="https://www.youtube.com/watch?v="+e[t].videoId,i.querySelector(".videoBlock__card-img").setAttribute("src",e[t].thumb),i.querySelector(".video-link").href="https://www.youtube.com/watch?v="+e[t].videoId,o.appendChild(i)}this.video_block.appendChild(o)}scrollVideoContainer(e){this.video_block.style.marginLeft=-320*e+"px",this.checkPagination()}clear_videos(){document.querySelector(".video__container-allVideos").innerHTML="",this.video_block.style.marginLeft="0px"}checkPagination(){let e=Math.ceil(this.model.videoList.length/this.model.clipsPerPage),t=Math.ceil(this.model.videoCounter/this.model.clipsPerPage);if(this.pagination.innerHTML="",0==this.model.videoList.length)this.pagination.innerHTML="";else if(e<11){for(let t=0;t<e;t++)this.pagination.innerHTML+='<div class="pagination-videoPage"></div>';document.getElementsByClassName("pagination-videoPage")&&document.getElementsByClassName("pagination-videoPage")[t].classList.add("current")}else this.pagination.innerHTML=this.model.videoCounter+1+(this.model.videoCounter+1==this.model.videoCounter+this.model.clipsPerPage?" of "+this.model.videoList.length:" - "+(this.model.videoCounter+this.model.clipsPerPage)+" of "+this.model.videoList.length)}};o.init(n),n.init(o),s.init(o)}]);