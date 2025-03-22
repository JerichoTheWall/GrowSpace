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
let currentIndex = 0;

// Load the minimal card into the swipe area (shows first image).
function loadStrainCard(strain) {
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

// Show the next strain in the lineup.
function showNextStrain() {
  if (lineup.length === 0) {
    document.getElementById("swipe-area").innerHTML = "<h2>No more strains for now.</h2>";
    return;
  }
  currentIndex = 0;
  loadStrainCard(lineup[currentIndex]);
}

// Swipe function:
// - Right swipe: add to favorites and remove from lineup.
// - Left swipe: re-add the strain to the end of the lineup, then remove from front.
function swipe(direction) {
  if (lineup.length === 0) return;
  const strain = lineup[currentIndex];
  
  if (direction === "right") {
    // Add to favorites if not already present.
    if (!favorites.find(s => s.id === strain.id)) {
      favorites.push(strain);
    }
  } else if (direction === "left") {
    // Always re-add the strain to the end.
    lineup.push(strain);
  }
  
  // Remove the strain from the front.
  lineup.splice(currentIndex, 1);
  showNextStrain();
}

// Show full profile view for a strain.
// If a strain is passed in, use that; otherwise, use the current strain in the lineup.
function showCurrentProfile(strainArg) {
  let strain = strainArg || (lineup.length > 0 ? lineup[currentIndex] : null);
  if (!strain) return;
  
  // Initialize the current image index if not set.
  if (typeof strain.currentImageIndex === "undefined") {
    strain.currentImageIndex = 0;
  }
  
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
        <button onclick="document.getElementById('profile-view').classList.add('hidden')">Close Profile</button>
      </div>
    </div>
  `;
  
  profileView.classList.remove("hidden");
  
  // Set up the "Next Image" button to cycle through the strain's images.
  document.getElementById("nextImage").addEventListener("click", () => {
    strain.currentImageIndex = (strain.currentImageIndex + 1) % strain.images.length;
    profileView.querySelector("img.strain-image").src = strain.images[strain.currentImageIndex];
  });
}

// Show the favorites list view.
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
      // Clicking a favorite opens its full profile.
      div.addEventListener("click", () => showCurrentProfile(strain));
      favList.appendChild(div);
    });
  }
  
  favView.classList.remove("hidden");
}

// Attach event listeners to the buttons.
document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));
document.getElementById("viewProfile").addEventListener("click", () => showCurrentProfile());
document.getElementById("viewFavorites").addEventListener("click", showFavorites);

// Initialize the swipe area with the first strain.
showNextStrain();
