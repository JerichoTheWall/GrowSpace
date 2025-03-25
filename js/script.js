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
// Chat Toggle Function
// ==================
function toggleChat() {
  const chatWidget = document.getElementById("chat-widget");
  // Toggle the "hidden" class
  if (chatWidget.classList.contains("hidden")) {
    chatWidget.classList.remove("hidden");
  } else {
    chatWidget.classList.add("hidden");
  }
}

// ==================
// GrowSpace Product Data & Functions
// ==================

// Define 5 strains with local image paths.
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

// Global arrays for the swipe lineup and favorites.
let favorites = [];
let lineup = [...strains];
lineup.sort(() => Math.random() - 0.5);

// Prevent swiping when a profile is open.
function canSwipe() {
  return document.getElementById("profile-view").classList.contains("hidden");
}

// Load the current strain's card (minimal info).
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

// Repopulate the lineup with strains not yet favorited if empty.
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
// - Right swipe: plays soft.wav, adds current strain to favorites and removes it permanently.
// - Left swipe: plays hard.wav and moves current strain to the end of the lineup.
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
// If strainArg is provided (e.g., from favorites), use it; otherwise, use the current strain.
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
        <a href="${buyURL}" target="_blank"><button onclick="playSoft()">Buy Now</button></a>
        <button onclick="playClick(); document.getElementById('profile-view').classList.add('hidden')">Close Profile</button>
      </div>
    </div>
  `;
  
  // Auto-close the favorites view if open.
  document.getElementById("favorites-view").classList.add("hidden");
  profileView.classList.remove("hidden");
  
  document.getElementById("nextImage").addEventListener("click", () => {
    playClick();
    strain.currentImageIndex = (strain.currentImageIndex + 1) % strain.images.length;
    profileView.querySelector("img.strain-image").src = strain.images[strain.currentImageIndex];
  });
}

// Show the favorites list view.
// Clicking a favorite plays soft.wav and opens its profile (auto-closing the favorites view).
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
// Chatbot Integration
// ==================

// Chat conversation history for ChatGPT-4.
let chatHistory = [
  { role: "system", content: "You are a helpful chatbot that asks the user what tastes they like and suggests a product from GrowSpace. When suggesting, include 'Suggesting:' followed by the product name." }
];

// Toggle the chat widget visibility.
function toggleChat() {
  const chatWidget = document.getElementById("chat-widget");
  if (chatWidget.classList.contains("hidden")) {
    chatWidget.classList.remove("hidden");
  } else {
    chatWidget.classList.add("hidden");
  }
}

// Append a message to the chat window.
function appendChatMessage(sender, text) {
  const chatMessages = document.getElementById("chat-messages");
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chat send event listener.
document.getElementById("chat-send").addEventListener("click", async () => {
  const inputField = document.getElementById("chat-input");
  const message = inputField.value.trim();
  if (!message) return;
  
  appendChatMessage("You", message);
  chatHistory.push({ role: "user", content: message });
  inputField.value = "";
  
  try {
    const response = await fetch('https://d8329534-949d-4683-992e-0381aef6592d-00-zviq92v6hqkn.worf.replit.dev', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory })
    });
    const data = await response.json();
    const reply = data.reply.content;
    appendChatMessage("Chatbot", reply);
    chatHistory.push({ role: "assistant", content: reply });
    
    if (reply.toLowerCase().includes("suggesting:")) {
      const product = reply.split("suggesting:")[1].trim();
      openProductProfile(product);
    }
    
  } catch (error) {
    console.error("Chatbot error:", error);
    appendChatMessage("Chatbot", "Sorry, there was an error processing your request.");
  }
});

// Open a product profile based on a suggested product name.
function openProductProfile(productName) {
  const strain = strains.find(s => s.name.toLowerCase() === productName.toLowerCase());
  if (strain) {
    document.getElementById("chat-widget").classList.add("hidden");
    showCurrentProfile(strain);
  }
}

// ==================
// Attach Event Listeners for Main UI
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
document.getElementById("open-chat").addEventListener("click", () => {
  playClick();
  toggleChat();
});

// ==================
// Initialize the App
// ==================
showNextStrain();