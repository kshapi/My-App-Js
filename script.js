const content = document.querySelector('.cont');
const main = document.querySelector('.main');
const spin = document.querySelector('.spin');


let scrollHeight;
let shouldApiCall = false;
const box = 6;
//Urls for profile And Images
let imageUrls = [];
let dpUrls = []
//Fake User Names
const fakeNames = ['Sager', 'Baloch', 'Legend', 'Boy', 'Noor', 'Kshapi', 'Hello', 'Lover', 'Nature', 'Babo', 'Rind', 'Dilpol', 'Abdo', 'Flooki', 'Ragnar', 'Broken', 'Diljale', 'Alblushi'];


//Check And Make API call
const callAPI = (e) => {
  
  const scrollTop = parseInt(main.scrollTop);
  
  if (scrollTop >= scrollHeight - 400 && shouldApiCall == true) {
    //Adding loader
    content.append(spin);
    imageUrls = [];
    dpUrls = []
     fetchImage();
     shouldApiCall = false;
  };
  
};
main.addEventListener('scroll',callAPI);


//Fetch Image Urls from Unsplash
const fetchImage = () => {
    
  for (let i = 0; i <= box; i++) {
    fetch(`https://source.unsplash.com/random/900x1000/?random`).then(res => {
      
      if (res.ok) {
        imageUrls.push(res.url);
        if (i === box) {
          fetchProfile();
        };
      }
      
    });
    
  };
  
}
fetchImage()


//Fetching DP Urls from Unsplash
const fetchProfile = () => {
  
  for (let i= 0;i <= box; i++) {
    fetch(`https://source.unsplash.com/random/900x1000/?man`).then(res => {
      
      if (res.ok) {
        dpUrls.push(res.url);
        if (i == box) {
          fetchData();
        };
      };
      
    });
    
  };
  
};


//Fetching Data in DOM
const fetchData = () => {
  //Removing Loader when page loaded
  spin.remove();
  for (var i = 0; i < imageUrls.length; i++) {
    
  const index = Math.floor(Math.random() * fakeNames.length);
  const tag = Math.floor(Math.random() * 1000);
  
  //Fake Likes
  const fakeLikes = Math.floor(Math.random() * 10000);
  //Fake Comments
  const fakeComments = Math.floor(Math.random() * 1000);
  
    content.innerHTML += `
        <div class="user">
           <div class="topRow">
             <div class="detail">
                <div class="pic">
                 <img src="${dpUrls[i]}">
                 <div class="name">
                   <h3>${fakeNames[index]}</h3>
                   <span>${tag}</span>
                 </div>
                </div>
             </div>
             <div class="dots">
                <h1>...</h1>
             </div>
           </div>
           <div class="image">
             <img src="${imageUrls[i]}" />
           </div>
           <div class="response">
              <div class="likes">
                <i class="fa-regular fa-heart"></i>
                <span>${fakeLikes}</span>
              </div>
              <div class="comments">
              <i class="fa-regular fa-comment"></i>
              <span>${fakeComments}</span>
            </div>
        </div>`;
    
  };
  //SCROLL bottom
  scrollHeight = parseInt(main.scrollHeight);
  shouldApiCall = true;
  
  //All images in DOM
  likeImages(content.querySelectorAll('.image'))
  
};

//Like Stup
const  likeImages = (image) => {
  //DblClick for Each Image
  image.forEach( img => {
    img.addEventListener('dblclick',like);
  });
  
};



const like = (e) => {
  const heart = e.target.parentNode.parentNode.querySelector('.fa-heart');
  const likeConut = e.target.parentNode.parentNode.querySelector('.likes span');
  
  heart.classList.replace('fa-regular', 'fa-solid');
  
  setTimeout(() => {
    heart.style.transform = 'scale(1)';
    //Increesing 1 Like in DOM
    likeConut.textContent = Number(likeConut.textContent)+1;
  }, 400);
  
};

//Kshapii