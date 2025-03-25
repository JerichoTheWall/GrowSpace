// ==================
// Sound Effects Setup
// ==================
const sfxSoft = new Audio('sfx/UI/soft.wav');
const sfxHard = new Audio('sfx/UI/hard.wav');
const sfxClick = new Audio('sfx/UI/click.wav');

function playSoft() {
  sfxSoft.play();
}

function playHard() {
  sfxHard.play();
}

function playClick() {
  sfxClick.play();
}

// ==================
// GrowSpace Product Data
// ==================
const strains = [
  {
    id: 1,
    name: "Green Crack",
    images: [
      "images/Green_Crack/Green_Crack_1.jpg",
      "images/Green_Crack/Green_Crack_2.jpg",
      "images/Green_Crack/Green_Crack_3.jpg"
    ],
    about: "Energizing sativa great for daytime use.",
    likes: ["Uplifting", "Focused", "Happy"],
    dislikes: ["Dry Mouth", "Paranoia"],
    terpenes: ["Limonene", "Pinene"],
    rating: 4.7,
    seenCount: 0
  },
  {
    id: 2,
    name: "Blue Dream",
    images: [
      "images/Blue_Dream/Blue_Dream_1.jpg",
      "images/Blue_Dream/Blue_Dream_2.jpg",
      "images/Blue_Dream/Blue_Dream_3.jpg"
    ],
    about: "Popular hybrid offering a gentle cerebral high.",
    likes: ["Relaxed", "Creative", "Euphoric"],
    dislikes: ["Dry Eyes"],
    terpenes: ["Myrcene", "Caryophyllene"],
    rating: 4.6,
    seenCount: 0
  },
  {
    id: 3,
    name: "OG Kush",
    images: [
      "images/OG_Kush/OG_Kush_1.jpg",
      "images/OG_Kush/OG_Kush_2.jpg",
      "images/OG_Kush/OG_Kush_3.jpg"
    ],
    about: "Indica dominant strain for deep relaxation.",
    likes: ["Sleepy", "Calm", "Pain Relief"],
    dislikes: ["Dizziness"],
    terpenes: ["Humulene", "Linalool"],
    rating: 4.8,
    seenCount: 0
  },
  {
    id: 4,
    name: "Pineapple Express",
    images: [
      "images/Pineapple_Express/Pineapple_Express_1.jpg",
      "images/Pineapple_Express/Pineapple_Express_2.jpg",
      "images/Pineapple_Express/Pineapple_Express_3.jpg"
    ],
    about: "Fruity sativa great for fun and creativity.",
    likes: ["Happy", "Energetic", "Giggly"],
    dislikes: ["Dry Mouth"],
    terpenes: ["Limonene", "Caryophyllene"],
    rating: 4.9,
    seenCount: 0
  },
  {
    id: 5,
    name: "Northern Lights",
    images: [
      "images/Northern_Lights/Northern_Lights_1.jpg",
      "images/Northern_Lights/Northern_Lights_2.jpg",
      "images/Northern_Lights/Northern_Lights_3.jpg"
    ],
    about: "Classic indica for nighttime chill and sleep.",
    likes: ["Sleepy", "Euphoric", "Calm"],
    dislikes: ["Dry Eyes", "Lethargy"],
    terpenes: ["Myrcene", "Limonene"],
    rating: 4.9,
    seenCount: 0
  }
];

// ==================
// Global Variables
// ==================
let favorites = [];
let lineup = [...strains];
lineup.sort(() => Math.random() - 0.5);

// ==================
// UI Helper Functions
// ==================
function canSwipe() {
  return document.getElementById("profile-view").classList.contains("hidden");
}

function loadStrainCard() {
  if (lineup.length === 0) {
    document.getElementById("swipe-area").innerHTML = "<h2>No more strains for now.</h2>";
    return;
  }
  const strain = lineup[0];
  document.getElementById("swipe-area").innerHTML = `
    <div class="strain-card">
      <img src="${strain.images[0]}" class="strain-image" />
      <div class="strain-info">
        <h2>${strain.name}</h2>
        <p>${strain.about}</p>
        <p><strong>Tap "View Profile" for more</strong></p>
      </div>
    </div>
  `;
}

function repopulateLineup() {
  const remaining = strains.filter(s => !favorites.find(f => f.id === s.id));
  if (remaining.length > 0) {
    lineup = [...remaining];
    lineup.sort(() => Math.random() - 0.5);
  }
}

function showNextStrain() {
  if (lineup.length === 0) {
    repopulateLineup();
    if (lineup.length === 0) {
      document.getElementById("swipe-area").innerHTML = "<h2>No more new strains available.</h2>";
      return;
    }
  }
  loadStrainCard();
}

// ==================
// Swipe Functions
// ==================
function swipe(direction) {
  if (!canSwipe()) return;
  if (lineup.length === 0) return;
  const strain = lineup[0];
  
  if (direction === "right") {
    playSoft();
    if (!favorites.find(s => s.id === strain.id)) {
      favorites.push(strain);
    }
    lineup.shift();
  } else if (direction === "left") {
    playHard();
    lineup.push(strain);
    lineup.shift();
  }
  
  showNextStrain();
}

// ==================
// Buy URL Function
// ==================
function getBuyURL(strainName) {
  switch(strainName) {
    case "OG Kush":
      return "https://dank-house.com/menu/search/?q=OG+kush";
    case "Pineapple Express":
      return "https://dank-house.com/menu/search/?q=Pineapple";
    case "Blue Dream":
      return "https://dank-house.com/menu/search/?q=Blue+Dream";
    case "Green Crack":
      return "https://dank-house.com/menu/search/?q=Green+crack";
    case "Northern Lights":
      return "https://dank-house.com/menu/search/?q=Northern+lights";
    default:
      return "#";
  }
}

// ==================
// Profile View Function
// ==================
function showCurrentProfile(strainArg) {
  if (!canSwipe()) return;
  let strain = strainArg || (lineup.length > 0 ? lineup[0] : null);
  if (!strain) return;
  
  if (typeof strain.currentImageIndex === "undefined") {
    strain.currentImageIndex = 0;
  }
  
  const buyURL = getBuyURL(strain.name);
  const profileView = document.getElementById("profile-view");
  profileView.innerHTML = `
    <div class="profile-strain">
      <h2>${strain.name}</h2>
      <img src="${strain.images[strain.currentImageIndex]}" class="strain-image" />
      <div class="profile-info">
        <p>${strain.about}</p>
        <p><strong>Likes:</strong> ${strain.likes.join(", ")}</p>
        <p><strong>Dislikes:</strong> ${strain.dislikes.join(", ")}</p>
        <p><strong>Terpenes:</strong> ${strain.terpenes.join(", ")}</p>
        <p><strong>Rating:</strong> ${strain.rating}</p>
      </div>
      <div class="profile-controls">
        <button id="nextImage">Next Image</button>
        <a href="${buyURL}" target="_blank">
          <button onclick="playSoft()">Buy Now</button>
        </a>
        <button onclick="playClick(); document.getElementById('profile-view').classList.add('hidden')">
          Close Profile
        </button>
      </div>
    </div>
  `;
  
  // Auto-close favorites view if open.
  document.getElementById("favorites-view").classList.add("hidden");
  profileView.classList.remove("hidden");
  
  document.getElementById("nextImage").addEventListener("click", () => {
    playClick();
    strain.currentImageIndex = (strain.currentImageIndex + 1) % strain.images.length;
    profileView.querySelector("img.strain-image").src = strain.images[strain.currentImageIndex];
  });
}

// ==================
// Favorites View Function
// ==================
function showFavorites() {
  const favView = document.getElementById("favorites-view");
  const favList = document.getElementById("favorites-list");
  favList.innerHTML = "";
  
  if (favorites.length === 0) {
    favList.innerHTML = "<p>No favorites yet!</p>";
  } else {
    favorites.forEach((strain) => {
      const div = document.createElement("div");
      div.className = "favorite-strain";
      div.innerHTML = `
        <h4>${strain.name}</h4>
        <p>${strain.about}</p>
        <small>Rating: ${strain.rating}</small>
      `;
      div.addEventListener("click", () => {
        playSoft();
        showCurrentProfile(strain);
      });
      favList.appendChild(div);
    });
  }
  favView.classList.remove("hidden");
}

// ==================
// Attach Main UI Event Listeners
// ==================
document.getElementById("swipeLeft").addEventListener("click", () => {
  swipe("left");
});
document.getElementById("swipeRight").addEventListener("click", () => {
  swipe("right");
});
document.getElementById("viewProfile").addEventListener("click", () => {
  playClick();
  showCurrentProfile();
});
document.getElementById("viewFavorites").addEventListener("click", () => {
  playClick();
  showFavorites();
});

// ==================
// Initialize the App
// ==================
showNextStrain();