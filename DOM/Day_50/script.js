const reels = [
  {
    isMuted:true,
    username: "Anna Medvedeva",
    likeCount: 1243,
    isLiked: false,
    commentCount: 89,
    caption: "Cloudy Day in the River",
    video: "./Videos/vid1.mp4",
    userProfile: "https://images.pexels.com/users/avatars/2921043/anna-medvedeva-666.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 34,
    isFollowed: true
  },
  {
    isMuted:true,
    username: "Spencer Campbell",
    likeCount: 9853,
    isLiked: true,
    commentCount: 312,
    caption: "Slow Motion Footage of Multnomah Falls",
    video: "./Videos/vid2.mp4",
    userProfile: "https://images.pexels.com/users/avatars/3188116/spencer-campbell-895.png?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 210,
    isFollowed: false
  },
  {
    isMuted:true,
    username: "Ruvim Miksanskiy",
    likeCount: 4521,
    isLiked: false,
    commentCount: 154,
    caption: "Video Of Forest",
    video: "./Videos/vid3.mp4",
    userProfile: "https://images.pexels.com/users/avatars/574687/ruvim-miksanskiy-139.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 87,
    isFollowed: false
  },
  {
    isMuted:true,
    username: "teyi 徐",
    likeCount: 7032,
    isLiked: true,
    commentCount: 268,
    caption: "Cherry Blossom Petals Falling in Traditional Garden",
    video: "./Videos/vid4.mp4",
    userProfile: "https://images.pexels.com/users/avatars/528835508/teyi-840.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 120,
    isFollowed: true
  },
  {
    isMuted:true,
    username: "byungkwan kim",
    likeCount: 27890,
    isLiked: false,
    commentCount: 1500,
    caption: "폭포",
    video: "./Videos/vid5.mp4",
    userProfile: "https://images.pexels.com/users/avatars/475032184/-700.jpg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 675,
    isFollowed: false
  },
  {
    isMuted:true,
    username: "sachin narayan",
    likeCount: 11234,
    isLiked: false,
    commentCount: 430,
    caption: "Aerial View of Tokyo's Vibrant Night Skyline",
    video: "./Videos/vid6.mp4",
    userProfile: "https://images.pexels.com/users/avatars/2150765836/sachin-narayan-401.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 203,
    isFollowed: true
  },
  {
    isMuted:true,
    username: "just a hobby",
    likeCount: 642,
    isLiked: false,
    commentCount: 42,
    caption: "Aerial View of Mountain Homestay in Tawangmangu",
    video: "./Videos/vid7.mp4",
    userProfile: "https://images.pexels.com/users/avatars/187834329/raufik-sahadah-865.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 18,
    isFollowed: false
  },
  {
    isMuted:true,
    username: "Theodore Nguyen",
    likeCount: 9034,
    isLiked: true,
    commentCount: 512,
    caption: "Serene Cherry Blossoms in Seoul During Spring",
    video: "./Videos/vid8.mp4",
    userProfile: "https://images.pexels.com/users/avatars/898884684/khanh-nguyen-900.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 340,
    isFollowed: true
  },
  {
    isMuted:true,
    username: "Ahmet Yüksek ✪",
    likeCount: 4321,
    isLiked: false,
    commentCount: 123,
    caption: "Aerial View of Train Through Forested Mountains",
    video: "./Videos/vid9.mp4",
    userProfile: "https://images.pexels.com/users/avatars/601325533/ahmet-yuksek-520.png?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 145,
    isFollowed: false
  },
  {
    isMuted:true,
    username: "Luke Miller",
    likeCount: 17890,
    isLiked: true,
    commentCount: 890,
    caption: "A lake with mountains in the background and a sunset",
    video: "./Videos/vid10.mp4",
    userProfile: "https://images.pexels.com/users/avatars/2498658/luke-miller-954.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
    shareCount: 390,
    isFollowed: true
  }
];

let allReels = document.querySelector('.all-reels');

function addData() {
sum = '';
reels.forEach((elem, idx) => {
    
    sum += `<div class="reel">
                    <video autoplay loop ${elem.isMuted ? "muted" : ""} src="${elem.video}" ></video>
                    <div class="mute" id=${idx}>
                      ${elem.isMuted?'<i class="ri-volume-mute-line"></i>' : '<i class="ri-volume-up-fill"></i>'}
                    </div>
                    <div class="bottom">
                        <div class="user">
                            <img src="${elem.userProfile}" alt="">
                            <div class="info">
                                <h4>${elem.username}</h4>
                                <h6>song</h6>
                            </div>
                            <button id=${idx} class="follow" >${elem.isFollowed ? "Unfollow" : "Follow"}</button>
                        </div>
                        <h4>${elem.caption}</h4>
                    </div>
                    <div class="right">
                        <div id= ${idx} class="like">
                            <h4>${elem.isLiked ? '<i class="liked ri-heart-fill"></i>' : '<i class="ri-heart-line"></i>'}</h4>
                            <h5>${elem.likeCount}</h5>
                        </div>
                        <div class="comment">
                            <h4><i class="ri-chat-3-line"></i></h4>
                            <h5>${elem.commentCount}</h5>
                        </div>
                        <div class="share">
                            <h4><i class="ri-telegram-2-line"></i></h4>
                            <h5>${elem.shareCount}</h5>
                        </div>
                        <div class="options">
                            <h4><i class="ri-more-2-line"></i></h4>
                        </div>
                        
                    </div>
                </div>`
})

allReels.innerHTML = sum;
// setupObserver();

}

addData();

allReels.addEventListener("click", function(dets){
  console.log(dets.target.className);
  if(dets.target.className == 'like'){
    if(!reels[dets.target.id].isLiked){
      reels[dets.target.id].likeCount++;
      reels[dets.target.id].isLiked = true;
    }else{
      reels[dets.target.id].likeCount--;
      reels[dets.target.id].isLiked = false;
    }
      addData();
  }
  if(dets.target.className == 'follow'){
    if(!reels[dets.target.id].isFollowed){
      reels[dets.target.id].isFollowed = true;
    }else{
      reels[dets.target.id].isFollowed = false;
    }
      addData();
  }
  if(dets.target.className == 'mute'){
    if(!reels[dets.target.id].isMuted){
      reels[dets.target.id].isMuted = true;
    }else{
      reels[dets.target.id].isMuted = false;
    }
      addData();
  }

})

// function setupObserver() {
//     const reelElements = document.querySelectorAll('.reel');

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             const video = entry.target.querySelector("video");

//             if (entry.isIntersecting) {
//                 video.muted = false;
//                 isMuted = false;
//                 video.play();
//             } else {
//                 video.muted = true;
//                 isMuted = true;
//                 video.pause();
//             }
//         });
//     }, { threshold: 0.6 });
    

//     reelElements.forEach(reel => observer.observe(reel));
    
// }


