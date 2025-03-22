// Define 5 strains with local image paths.
// Each strain's images are stored in images/Strain_Name folders (spaces replaced by underscores).
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
    price: "$25/g",
    deal: "10% off today",
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
    price: "$22/g",
    deal: "Buy 1g get 1 free",
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
    price: "$28/g",
    deal: "Free pre-roll with 3.5g",
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
    price: "$27/g",
    deal: "Free edible sample",
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
    price: "$26/g",
    deal: "25% off after 8PM",
    seenCount: 0
  }
];

// Global arrays for swipe lineup and favorites.
let favorites = [];
let lineup = [...strains];
lineup.sort(() => Math.random() - 0.5);

// Load the current strain's card (shows minimal info).
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

// If lineup becomes empty, repopulate it with strains not yet favorited.
function repopulateLineup() {
  const remaining = strains.filter(s => !favorites.find(f => f.id === s.id));
  if (remaining.length > 0) {
    lineup = [...remaining];
    lineup.sort(() => Math.random() - 0.5);
  }
}

// Show the next strain.
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

// Swipe function:
// - Right swipe: adds the current strain to favorites (if not already) and removes it.
// - Left swipe: moves the current strain to the end of the lineup.
function swipe(direction) {
  if (lineup.length === 0) return;
  const strain = lineup[0];
  
  if (direction === "right") {
    if (!favorites.find(s => s.id === strain.id)) {
      favorites.push(strain);
    }
    lineup.shift(); // remove permanently
  } else if (direction === "left") {
    lineup.push(strain); // re-add to the end
    lineup.shift(); // remove from front
  }
  
  showNextStrain();
}

// Determine the Buy URL based on the strain name.
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

// Show the full profile view for a strain.
// If strainArg is provided (from favorites), use it; otherwise, use the current strain.
function showCurrentProfile(strainArg) {
  let strain = strainArg || (lineup.length > 0 ? lineup[0] : null);
  if (!strain) return;
  
  // Initialize image index if not already set.
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
        <p><strong>Price:</strong> ${strain.price}</p>
        <p><strong>Deal:</strong> ${strain.deal}</p>
      </div>
      <div class="profile-controls">
        <button id="nextImage">Next Image</button>
        <a href="${buyURL}" target="_blank"><button>Buy Now</button></a>
        <button onclick="document.getElementById('profile-view').classList.add('hidden')">Close Profile</button>
      </div>
    </div>
  `;
  
  // If the profile was opened from the favorites view, auto-close favorites.
  document.getElementById("favorites-view").classList.add("hidden");
  
  profileView.classList.remove("hidden");
  
  document.getElementById("nextImage").addEventListener("click", () => {
    strain.currentImageIndex = (strain.currentImageIndex + 1) % strain.images.length;
    profileView.querySelector("img.strain-image").src = strain.images[strain.currentImageIndex];
  });
}

// Show the favorites list view.
// Clicking a favorite strain opens its full profile and auto-closes the favorites view.
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
        <small>Price: ${strain.price} | Rating: ${strain.rating}</small>
      `;
      // When clicked, show full profile and auto-close favorites.
      div.addEventListener("click", () => {
        showCurrentProfile(strain);
      });
      favList.appendChild(div);
    });
  }
  favView.classList.remove("hidden");
}

// Attach event listeners to buttons.
document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));
document.getElementById("viewProfile").addEventListener("click", () => showCurrentProfile());
document.getElementById("viewFavorites").addEventListener("click", showFavorites);

// Initialize by showing the first strain.
showNextStrain();
