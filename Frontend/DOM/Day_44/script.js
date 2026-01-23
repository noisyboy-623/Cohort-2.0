let main = document.querySelector("main");
let button = document.querySelector("button");

const greetings = [
  "Hello",          // English
  "नमस्ते",         // Hindi
  "Hola",           // Spanish
  "Bonjour",        // French
  "Ciao",           // Italian
  "こんにちは",       // Japanese
  "안녕하세요",         // Korean
  "Guten Tag",      // German
  "سلام",           // Arabic / Persian
  "Здравствуйте",   // Russian
  "你好",            // Chinese (Mandarin)
  "வணக்கம்",         // Tamil
  "നമസ്കാരം",        // Malayalam
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",   // Punjabi
  "Kia Ora"         // Māori
];


button.addEventListener("click", () => {
    
    let h1 = document.createElement("h1");
    let div = document.createElement("div");
    let x = Math.random()*100;
    let y = Math.random()*100;
    let rot = Math.random()*360;
    let c1 = Math.floor(Math.random()*256);
    let c2 = Math.floor(Math.random()*256);
    let c3 = Math.floor(Math.random()*256);
    

    let greet = greetings[Math.floor(Math.random() * greetings.length)];
    h1.textContent = greet;

    main.appendChild(div);

    div.style.position = "absolute";
    div.style.left = x + "%"
    div.style.top = y + "%"
    div.style.width = "auto";
    div.style.height = "auto";
    div.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
    div.style.rotate = rot + "deg";
    div.style.padding = "30px";
    div.style.borderRadius = "10px";

    div.appendChild(h1);
});