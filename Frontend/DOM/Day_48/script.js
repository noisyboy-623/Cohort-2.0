const aud24 = new Audio('./audio/24.mp3');
const aud29 = new Audio('./audio/29.mp3');
const aud36 = new Audio('./audio/36.mp3');
const aud41 = new Audio('./audio/41.mp3');
const aud48 = new Audio('./audio/48.mp3');
const aud53 = new Audio('./audio/53.mp3');
const aud60 = new Audio('./audio/60.mp3');
const aud64 = new Audio('./audio/64.mp3');
const aud65 = new Audio('./audio/65.mp3');
const aud69 = new Audio('./audio/69.mp3');
const aud72 = new Audio('./audio/72.mp3');
const aud77 = new Audio('./audio/77.mp3');
const aud79 = new Audio('./audio/79.mp3');
const aud84 = new Audio('./audio/84.mp3');
const aud96 = new Audio('./audio/96.mp3');

const sounds = {
    q: aud53,
    w: aud60,
    e: aud64,
    r: aud65,
    t: aud69,
    y: aud72,
    u: aud77,
    i: aud79,
    o: aud84,
    p: aud96,
    1: aud24,
    2: aud29,
    3: aud36,
    4: aud41,
    5: aud48
};


let board = document.getElementById("board");
// let whiteKeys = document.querySelectorAll(".whiteKeys .wk");
let whiteKeys = document.querySelectorAll(".whiteKeys");
document.addEventListener("keydown", (e) => {
    let sound = sounds[e.key.toLowerCase()];
    if (sound) {
        sound.currentTime = 0;  // allows fast repeated notes
        sound.play();
        highlightKey(e.key);
    }
});

function highlightKey(key) {
    key = key.toLowerCase();
    const ele = document.querySelector(`[data-key="${key}"]`);
    if (!ele) return;

    ele.classList.add("active");
    setTimeout(() => ele.classList.remove("active"), 150);
}




// document.addEventListener("keydown", (dets) => {
//     if (dets.key == "q") {
//         aud53.play();
//     }else if (dets.key == "w") {
//         aud60.play();
//     }else if (dets.key == "e") {
//         aud64.play();
//     }else if (dets.key == "r") {
//         aud65.play();
//     }else if (dets.key == "t") {
//         aud69.play();
//     }else if (dets.key == "y") {
//         aud72.play();
//     }else if (dets.key == "u") {
//         aud77.play();
//     }else if (dets.key == "i") {
//         aud79.play();
//     }else if (dets.key == "o") {
//         aud84.play();
//     }else if (dets.key == "p") {
//         aud96.play();
//     }else if (dets.key == "1") {
//         aud24.play();
//     }else if (dets.key == "2") {
//         aud29.play();
//     }else if (dets.key == "3") {
//         aud36.play();
//     }else if (dets.key == "4") {
//         aud41.play();
//     }else if (dets.key == "5") {
//         aud48.play();
//     }
// });


