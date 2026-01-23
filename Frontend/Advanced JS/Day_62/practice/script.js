let taskbar = document.querySelector(".taskbar");
let searchbar = document.querySelector(".searchBar")
let rtclick = document.querySelector(".rtClick")
let isVisible = false;

document.addEventListener("click", () => {
    if (isVisible = true) {
        isVisible = false;
        rtclick.style.display = "none";
    }
})

document.addEventListener("contextmenu", (e)=>{
    isVisible = true;
    e.preventDefault();
    console.log(e.clientX);
    rtclick.style.display = "block";
    rtclick.style.left = e.clientX + "px";
    rtclick.style.top = e.clientY + "px";
    
})



document.addEventListener("mousemove", (e) => {
    if (e.clientY >= window.innerHeight - 10 && !isVisible) {
        isVisible = true;
        console.log("Done");
        taskbar.classList.add("visibleBar");
    }
});

taskbar.addEventListener("mouseleave", () => {
    isVisible = false;
    taskbar.classList.remove("visibleBar");
});
