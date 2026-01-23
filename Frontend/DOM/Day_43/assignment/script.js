let btn = document.querySelector("button");
let box = document.querySelector("#box");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
let short = document.querySelector("#short");

var arr = [
  {
    team: 'CSK',
    primary: 'yellow',
    secondary: 'blue',
    fullName: 'Chennai Super Kings',
    trophies: 5,
    captain: 'MSD'
  },
  {
    team: 'MI',
    primary: 'blue',
    secondary: 'gold',
    fullName: 'Mumbai Indians',
    trophies: 5,
    captain: 'Hardik Pandya'
  },
  {
    team: 'RCB',
    primary: 'red',
    secondary: 'black',
    fullName: 'Royal Challengers Bengaluru',
    trophies: 0,
    captain: 'Faf du Plessis'
  },
  {
    team: 'KKR',
    primary: 'purple',
    secondary: 'gold',
    fullName: 'Kolkata Knight Riders',
    trophies: 3,
    captain: 'Shreyas Iyer'
  },
  {
    team: 'RR',
    primary: 'pink',
    secondary: 'blue',
    fullName: 'Rajasthan Royals',
    trophies: 1,
    captain: 'Sanju Samson'
  },
  {
    team: 'SRH',
    primary: 'orange',
    secondary: 'black',
    fullName: 'Sunrisers Hyderabad',
    trophies: 1,
    captain: 'Pat Cummins'
  },
  {
    team: 'DC',
    primary: 'blue',
    secondary: 'red',
    fullName: 'Delhi Capitals',
    trophies: 0,
    captain: 'Rishabh Pant'
  },
  {
    team: 'LSG',
    primary: 'skyblue',
    secondary: 'orange',
    fullName: 'Lucknow Super Giants',
    trophies: 0,
    captain: 'KL Rahul'
  },
  {
    team: 'GT',
    primary: 'navy',
    secondary: 'gold',
    fullName: 'Gujarat Titans',
    trophies: 1,
    captain: 'Shubman Gill'
  },
  {
    team: 'PBKS',
    primary: 'red',
    secondary: 'silver',
    fullName: 'Punjab Kings',
    trophies: 0,
    captain: 'Shikhar Dhawan'
  }
];


btn.addEventListener("click", function(){
    let winner = arr[Math.floor(Math.random()*arr.length)];

    h1.innerHTML = winner.fullName;
    short.innerHTML = `(${winner.team})`;
    h3.innerHTML = winner.captain;
    h4.innerHTML = `Trophies : ${winner.trophies}`;
    h1.style.color = winner.primary;
    h3.style.color = winner.primary;
    h4.style.color = winner.primary
    short.style.color = winner.primary;
    box.style.backgroundColor = winner.secondary;
})

