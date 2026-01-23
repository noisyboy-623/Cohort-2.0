// 1. function foodOrder(ordername, cb){
//     setTimeout(function(){
//         console.log(`Order Confirmed : ${ordername}`);
//         cb();
//     },2000)
// };

// foodOrder("Harsh", function(){
//     console.log("Notifying customer...");
// });

// 2. let un = "Harsh";
// function userLoginCheck(username, cb){
//     setTimeout(function(){
//         if(username === un){
//             cb("Login successful");
//         }else{
//             cb("Login unsucessful");
//         }
//     },2000)
// }

// userLoginCheck("Harsh", function(message){
//     console.log(message);
// })

// 3. function bankBalanceFetch(userid, cb){
//     console.log("Fetching balance...");
//     setTimeout(function(){
//         let balance = 5000;
//         cb(balance);
//     },2000)
// }

// bankBalanceFetch("Harsh", function(balance){
//     console.log(`Your balance is : ${balance}`);
// })

// 4. function onlinePayment(amt, cb){
//     setTimeout(function(){
//         let message; 
//         let status;
//         if(amt >= 1000){
//             status = "Failed";
//             message = "Payment Declined";    
//         }else{
//             status = "Success";
//             message = "Payment Successful";
//         }
//         cb(status, message);
//     },2000)
// }

// onlinePayment(2500, function(status,message){
//     console.log(`Payment status : ${status}`);
//     console.log(message);
// })

// 5. function fileUpload(filename, cbsuccess, cbfailure){
//     setTimeout(function(){
//         let fs = Math.floor(Math.random()*10);
//         console.log(fs);
        
//         if(fs <= 5){
//             cbsuccess(filename, "Upload Success");
//         }else{
//             cbfailure(filename, "Upload Failure");
//         }
//     },3000)
// }

// fileUpload("Hello.txt", function(name, message){
//     console.log(`${name} : ${message}`);
// }, function(name, message){
//     console.log(`${name} : ${message}`);
// })  

// 6. function registerUser(name, cb){
//     setTimeout(() => {
//         console.log(`User Registered`);
//         cb(name);        
//     }, 2000);
// }

// function sendVerficationEmail(cb){
//     setTimeout(() => {
//         console.log("Sending Verification Email...");
//         cb();
//     }, 3000); 
// }

// function showWelcomeMessage(cb){
//     setTimeout(() => {
//         cb();
//     }, 4000);
// }

// registerUser("Harsh", function(name){
//     sendVerficationEmail(function(){
//         showWelcomeMessage(function(){
//             console.log(`Welcome, ${name}`);
//         })
//     })    
// })

// 7. function validateCart(cb) {
//     setTimeout(() => {
//         console.log("validating cart...");
//         cb();
//     }, 1000);
// }

// function processPayment(cb) {
//     setTimeout(() => {
//         console.log("Processing payment...");
//         cb();
//     }, 2000)
// }

// function generateInvoice(cb) {
//     setTimeout(() => {
//         console.log("Generating invoice...");
//         cb();
//     }, 3000);
// }

// function sendConfirmation(cb) {
//     setTimeout(() => {
//         console.log("Sending confirmation...");
//         cb();
//     }, 4000);
// }

// validateCart(function(){
//     processPayment(function(){
//         generateInvoice(function(){
//             sendConfirmation(function(){
//                 console.log("Purchase Successful!!")
//             })
//         })
//     })
// })

// 8. function apiFetch(url, cb){
//     setTimeout(() => {
//         let success = Math.random() > 0.5;
//         console.log("Fetching Data...");
//         if (success == true) {
//             cb(null, {id:1, name: "abc"});
//         }else{
//             cb(new Error ("API fetch failed"), undefined);
//         }
//     }, 2000);
// }

// apiFetch("https://stiff-schnitzel.com/", function(err, data){
//     if (err === null) {
//         console.log(`Data Recieved : ${data.name}`);
//     }else{
//         console.log(`${err}`);
        
//     }
// })

// 9. function uploadVideo(filename, cb){
//     setTimeout(() => {
//         console.log("Uploading video...");
//         let videoId = Math.floor(Math.random()*100);
//         cb(videoId);
//     }, 2000);
// }

// function processVideo(videoId, cb) {
//     setTimeout(() => {
//         console.log("Processing video...");
//         cb(videoId)
//     }, 3000);
// }

// function generateThumbnail(videoId, cb) {
//     setTimeout(() => {
//         console.log("Generating thumbnail...");
//         cb(videoId);
//     }, 4000);    
// }

// function publishVideo(videoId, cb) {
//     setTimeout(() => {
//         console.log("Publishing video...");
//         cb("Video is now live !");
//     }, 4000);    
// }

// uploadVideo("MyFirstVideo.mp4", function(videoId){
//     processVideo(videoId, function(){
//         generateThumbnail(videoId, function(){
//             publishVideo(videoId, function(message){
//                 console.log(message);
                
//             })
//         })
//     })
// })

// 10. function connectToServer(cb) {
//     setTimeout(() => {
//         let success = Math.random() > 0.1;
//         console.log(success);
        
//         if (success == true) {
//             cb(null, "serverConnected");
//         }else{
//             cb(new Error("Server connection failed"), null);
//         }
//     }, 2000);
// }

// function authenticateUser(token, cb) {
//     setTimeout(() => {
//         let success = Math.random() > 0.1;
//         console.log(success);
//         if (success == true) {
//             cb(null, "a12b");
//         }else{
//             cb(new Error("Authentication failed"), null);
//         }
//     }, 2000);
// }

// function loadMessages(userId, cb) {
//     setTimeout(() => {
//         let success = Math.random() > 0.1;
//         console.log(success);
//         if (success == true) {
//             cb(null,  ["Hi", "Hello", "How are you?"]);
//         }else{
//             cb(new Error("Failed to load messages"), null);
//         }
//     }, 2000);
// }

// function startLiveChat(message, cb) {
//     setTimeout(() => {
//         console.log("Chat started...");
//         cb(null, "Chat is live");
//     }, 2000);
// }

// connectToServer(function(err){
//     if (err) {
//         console.log(err);
//         return;
//     }else{
//         authenticateUser("1224", function(err,userId){
//             if (err) {
//                 console.log(err);
//                 return;
//             }else{
//                 loadMessages(userId, function(err, message){
//                     if (err) {
//                         console.log(err);
//                         return;
//                     }else{
//                         startLiveChat(message, function(err){
//                             if (err) {
//                                 console.log(err);
//                                 return;
//                             }else{
//                                 console.log("User is now chatting live !");
//                                 console.log(message);
//                             }
//                         })
//                     }
//                 })
//             }            
//         })
//     }
// })