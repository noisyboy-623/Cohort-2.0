let grow = 0;
let btn = document.querySelector("Button");
let loader = document.querySelector(".inner")
let h1 = document.querySelector("h1");
let card = document.querySelector(".card");

btn.addEventListener("click", function() {

    let time = 50 + (Math.floor(Math.random()*50));
    let h4 = document.createElement("h4");
    h4.innerHTML = `Your file will be downloaded in <span>${time/10}</span> seconds`;
    h4.style.fontWeight = "normal";
    card.appendChild(h4);

    btn.style.pointerEvents = "none";
    btn.style.opacity = 0.6;
    btn.innerHTML = "Downloading";

    let loading = setInterval( () => {
        grow++;
        h1.innerHTML = `${grow}%`
        loader.style.width = `${grow}%`;
    }, time);

    setTimeout( () => {
        clearInterval(loading);
        h4.innerHTML = "Download Completed";
        btn.innerHTML = "Downloaded";
    }, time * 100);
});