const reels = [
  {
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
sum = '';
reels.forEach((elem) => {
    
    sum += `<div class="reel">
                    <video autoplay loop muted src="${elem.video}" ></video>
                    <div class="bottom">
                        <div class="user">
                            <img src="${elem.userProfile}" alt="">
                            <div class="info">
                                <h4>${elem.username}</h4>
                                <h6>song</h6>
                            </div>
                            <button>${elem.isFollowed ? "Unfollow" : "Follow"}</button>
                        </div>
                        <h4>${elem.caption}</h4>
                    </div>
                    <div class="right">
                        <div class="icon">
                            <h4>${elem.isLiked ? '<i class="liked ri-heart-fill"></i>' : '<i class="ri-heart-line"></i>'}</h4>
                            <h5>${elem.likeCount}</h5>
                        </div>
                        <div class="icon">
                            <h4><i class="ri-chat-3-line"></i></h4>
                            <h5>${elem.commentCount}</h5>
                        </div>
                        <div class="icon">
                            <h4><i class="ri-telegram-2-line"></i></h4>
                            <h5>${elem.shareCount}</h5>
                        </div>
                        <div class="icon">
                            <i class="ri-more-2-line"></i>
                        </div>
                    </div>
                </div>`
})
console.log(sum);

document.querySelector('.all-reels').innerHTML = sum;
