let img = document.querySelector(".card img");
let heart = document.querySelector(".card .anim");
let like = document.querySelector(".like");
let like2 = document.querySelector(".like2");

img.addEventListener("dblclick", function() {
    heart.style.opacity = 1;
    heart.style.transform = "translate(-50%,-50%) scale(1) rotate(0deg)";
    like.style.display = "none";
    like2.style.display = "inline-block";

    setTimeout(function () {
        heart.style.transform = 'translate(-50%,-450%) scale(1) rotate(60deg)'
    }, 950)

    setTimeout(function() {
        heart.style.opacity = 0;
    }, 1000);

    setTimeout(function () {
        heart.style.transform = 'translate(-50%,-50%) scale(0) rotate(-60deg)'
    }, 1200)
});

like.addEventListener("click", function() {
    like.style.display = "none";
    like2.style.display = "inline-block";

    heart.style.opacity = 1;
    heart.style.transform = "translate(-50%,-50%) scale(1) rotate(0deg)";
    like.style.display = "none";
    like2.style.display = "inline-block";

    setTimeout(function() {
        heart.style.opacity = 0;
    }, 1000);

    setTimeout(function () {
        heart.style.transform = 'translate(-50%,-50%) scale(0) rotate(-60deg)'
    }, 1200)
});

like2.addEventListener("click", function() {
    like2.style.display = "none";
    like.style.display = "inline-block";

});