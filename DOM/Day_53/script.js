let para = document.querySelector("p");
let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let text = para.innerText;

// para.addEventListener("mouseenter", ()=>{
//     setInterval(()=>{
//         const str = text.split("").map((char, idx) => {
//             return character.split("")[Math.floor(Math.random()*53)]
//         }).join("")
//         para.innerText = str;
//     },300);
// })

let iteration = 0;
function randomText (){
    const str = text.split("").map((char, idx) => {
        if(idx < iteration) return char
        return character.split("")[Math.floor(Math.random()*52)]
        }).join("")
        para.innerText = str;
        iteration += 0.35;
}

let intervalId;

para.addEventListener("mouseenter", () => {
    clearInterval(intervalId);   // stop any old interval
    iteration = 0;               // reset
    intervalId = setInterval(() => {
        randomText();
        if (iteration >= text.length) clearInterval(intervalId); // stop after done
    }, 30);
});

// para.addEventListener("mouseenter",()=>{
// setInterval(randomText,30);
// iteration = 0;
// })


// let para = document.querySelector("p");
// let text = para.innerText;
// let split1 = text.split(" ")



// para.addEventListener("mouseenter", ()=>{
//     setTimeout(()=>{
//         const str = text.split(" ").map((char, idx) => {
//             return text.split(" ").forEach((e)=>{
//                 e.split("")[Math.floor(Math.random()*5)]
//             })
//             // return split1.split("")[Math.floor(Math.random()*5)]
//         }).join(" ")
//         console.log(str);
//         console.log(str.length);
        
//         para.innerText = str;
//     },300);
// })

// split1.forEach((e)=>{
//     console.log(e);
//     let split2 = e.split("")
//     console.log(split2);     
// })
// console.log(text.length);


// let para = document.querySelector("p");
// let text = para.innerText
// let words = text.split(" ");
 
// const scramble = (word) => {
//     let chars = word.split("");
//     for (let i = chars.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [chars[i], chars[j]] = [chars[j], chars[i]];
//     }
//     return chars.join("");
// };

// para.addEventListener("mouseenter", () => {
//     setTimeout(() => {
//         const str = words.map(scramble).join(" ");
//         para.innerText = str;
//     }, 300);
// });
