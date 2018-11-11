let notification=document.querySelector(".notification");
let notification_close=document.querySelector(".notification-close");
notification_close.addEventListener("click", close_notification);
let notification_text=document.querySelector(".notification_text");
let current_email=0;
let paginator_prev=document.querySelector(".notification__paginator-prev");
let paginator_next=document.querySelector(".notification__paginator-next");
let notification_disable=document.getElementById("notification_disable");


document.addEventListener("DOMContentLoaded", function(){
    setTimeout(ready, 5000);
});
document.addEventListener("keyup", key_controls);
paginator_prev.addEventListener("click", prev_email);
paginator_next.addEventListener("click", next_email);
notification_disable.addEventListener("change", elem_disable);

function ready (){
    if(localStorage.getItem('disable_status') == "true") {return}; 
    notification.style.display="block";
    add_message();
}

function paginator_color (){
    let paginator_page=document.querySelectorAll(".notification__paginator-page");
    paginator_page.forEach((v,i,a)=>a[i].style.backgroundColor="#c9cacb");
    paginator_page[current_email].style.backgroundColor="#008efe";
}

function add_message(){
    notification_text.innerHTML="<p>"+messages_arr[current_email][0]+"</p>"+messages_arr[current_email][1];
    paginator_color();
}

function next_email(){
    if (current_email<messages_arr.length-1){
        current_email++;
        add_message();
    }else{
        current_email=0;
        add_message();
    }
}

function prev_email(){
    if (current_email>0){
        current_email--;
        add_message();
    }else{
        current_email=messages_arr.length-1;
        add_message();
    }
}

function close_notification () {
    notification.style.display="none";
}

function elem_disable() {
    localStorage.setItem('disable_status', notification_disable.checked);
}

function key_controls (e) {
    if (e.keyCode==39) {
        next_email();
    }else if (e.keyCode==37){
        prev_email();
    }else if(e.keyCode==27){
        close_notification();
    }
}
