//Level 1 JavaScript Practice Problems

// 1.
// for (let i = 1; i < 11; i++) {
//     console.log(i);
// }

// 2.
// for(let i = 1; i < 21; i++) {
//     if(i % 2 === 0) {
//         console.log(i);
//     }
// }

// 3.
// for(let i = 10; i > 0; i--) {
//     console.log(i);
// }

// 4.
// for(let i = 1; i < 6; i++) {
//     console.log("Yes");
// }

// 5.
// for( let i = 1; i < 11; i++) {
//     if(i%2 == 0) {
//         console.log(`${i} - Even`);
//     } else {
//         console.log(`${i} - Odd`);
//     }
// }

// 6.
// let num = +prompt("Enter a number:");
// if(num > 0) {
//     console.log("Positive");
// } else if(num < 0) {
//     console.log("Negative");
// } else {
//     console.log("Zero");
// }

// 7.7. Ask user’s age and check if eligible to vote If age >= 18 → “Eligible”, else → “Not eligible”
// let age = +prompt("Enter your age:");
// if(age >= 18) {
//     console.log("Eligible to vote");
// } else {
//     console.log("Not eligible to vote");
// }

//8. Print multiplication table of 5 Use loop to print 5 × 1 to 5 × 10.
// for(let i = 1; i < 11; i++) {
//     console.log(`5 x ${i} = ${5*i}`);
// }

//9. Count how many numbers between 1 and 15 are greater than 8 Loop and count conditionally.
// let count = 0;
// for(let i = 1; i < 16; i++) {
//     if(i > 8) count ++;
// }
// console.log(`Count of numbers greater than 8 between 1 and 15 is: ${count}`);

//10. Ask user for password and print access status Hardcoded correct password. Compare with user input.
// let pass = "abc123";
// let userPass = prompt("Enter your password:");
// if(userPass === pass) {
//     console.log("Access Granted");
// } else {
//     console.log("Access Denied");
// }

//Level 2 – Slightly Tougher but Logical

//11. Allow only 3 attempts to enter correct password If user gets it right early, stop. If not → “Account locked”
// let count = 0;
// let correctPass = "abc123";
// let userPass = prompt("Enter your password:");
// count++;
// while(userPass !== correctPass && count < 3) {
//     userPass = prompt("Incorrect password. Try again:");
//     count++;
// }
// while(userPass !== correctPass && count === 3) {
//     console.log("Account locked");
//     break;
// }
// if(userPass === correctPass) {
//     console.log("Access Granted");
// }

// OR

// let count = 0;
// let correctPass = "abc123";
// let userPass = prompt("Enter your password:");
// count++;
// while(userPass !== correctPass && count < 3) {
//     if(count === 3){
//         console.log("Account locked");
//         break;
//     }
//     userPass = prompt("Incorrect password. Try again:");
//     count++;
// }
// if(userPass === correctPass) {
//     console.log("Access Granted");
// }else{
//     console.log("Account locked");
// }

//12. Ask user for words until they type “stop”. Count how many times they typed “yes” Loop until "stop" is typed. Count "yes".
// let count = 0;
// let inp = prompt("Enter a word (type 'stop' to end):");
// while(inp !== "stop") {
//     if (inp === "yes") {
//         count++;
//     }
//     inp = prompt("Enter a word (type 'stop' to end):");
// }
// console.log(`You typed "yes" ${count} times.`);

//13. Print numbers divisible by 7 from 1 to 50 Use modulo % and loop
// for(let i = 1; i < 51; i++) {
//     if( i  % 7 === 0) {
//         console.log(i);
//     }
// }

//14. Sum of all odd numbers from 1 to 30 Add only odd numbers. Print final sum.
// let sum  = 0;
// for( let i = 1; i < 31; i++){
//     if(i % 2 !==0){
//         sum += i;
//     }
// }
// console.log(`Sum = ${sum}`);

//15. Keep asking number until user enters an even number Use while loop. Stop only if input is even.
// let input = +prompt("Enter a number (even number to stop):");
// while(input % 2 !== 0) {
//     input = +prompt("That's odd! Please enter an even number to stop:");
// }

//16. Print numbers between two user inputs Input start and end using prompt() → print all between.
// let start = +prompt("Enter start number:");
// let end = +prompt("Enter end number:");
// for(let i=start; i <= end; i++) {
//     console.log(i);
// }

//17. Print only first 3 odd numbers from 1 to 20 Use loop. Stop with break after 3 odd prints.
// let count = 0;
// for(let i= 1; i< 21; i++) {
//     if(i % 2 !== 0) {
//         if(count === 3) {
//             break;
//         }
//         console.log(i);
//         count++;
//     }
// }

//18. Ask user 5 numbers. Count how many are positive Use loop + condition + counter.
// let count = 0;
// for(let i = 1; i <= 5; i++) {
//     let num = +prompt(`Enter number ${i}:`);
//     if(num > 0) {
//         count++;
//     }
// }
// console.log(`You entered ${count} positive numbers.`);

//19. ATM Simulator – Allow 3 withdrawals Start with ₹1000 balance. Ask withdrawal amount 3 times. If enough balance → deduct Else → print “Insufficient balance”


