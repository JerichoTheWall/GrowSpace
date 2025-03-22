const strains = [
  {
    id: 1,
    name: "Green Crack",
    image: "https://images.unsplash.com/photo-1628115803933-f7f3d35a5c11",
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
    image: "https://images.unsplash.com/photo-1601612624377-47a7b67443b5",
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
    image: "https://images.unsplash.com/photo-1627958826796-eebc76ee0c3e",
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
    image: "https://images.unsplash.com/photo-1617957747486-0f11e370a760",
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
    image: "https://images.unsplash.com/photo-1612178996754-14698b4b835d",
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

let favorites = [];
let lineup = [...strains];
lineup.sort(() => Math.random() - 0.5);
let currentIndex = 0;

function loadStrainCard(strain) {
  document.getElementById("swipe-area").innerHTML = `
    <div class="strain-card">
      <img src="${strain.image}" class="strain-image" />
      <div class="strain-info">
        <h2>${strain.name}</h2>
        <p>${strain.about}</p>
        <p><strong>Tap "View Profile" for more</strong></p>
      </div>
    </div>
  `;
}

function showNextStrain() {
  if (lineup.length === 0) {
    document.getElementById("swipe-area").innerHTML = "<h2>No more strains for now.</h2>";
    return;
  }

  currentIndex = 0;
  loadStrainCard(lineup[currentIndex]);
}

function swipe(direction) {
  const strain = lineup[currentIndex];
  if (!strain) return;

  if (direction === "right") {
    favorites.push(strain);
  } else if (direction === "left") {
    strain.seenCount += 1;
    if (Math.random() < 0.3) {
      lineup.push(strain); // rare reappearance
    }
  }

  lineup.splice(currentIndex, 1);
  showNextStrain();
}

function showCurrentProfile() {
  const strain = lineup[currentIndex];
  if (!strain) return;

  const view = document.getElementById("profile-view");
  view.innerHTML = `
    <div class="profile-strain">
      <h2>${strain.name}</h2>
      <img src="${strain.image}" class="strain-image" />
      <p>${strain.about}</p>
      <p><strong>Likes:</strong> ${strain.likes.join(", ")}</p>
      <p><strong>Dislikes:</strong> ${strain.dislikes.join(", ")}</p>
      <p><strong>Terpenes:</strong> ${strain.terpenes.join(", ")}</p>
      <p><strong>Rating:</strong> ${strain.rating}</p>
      <p><strong>Price:</strong> ${strain.price}</p>
      <p><strong>Deal:</strong> ${strain.deal}</p>
      <button onclick="document.getElementById('profile-view').classList.add('hidden')">Close</button>
    </div>
  `;
  view.classList.remove("hidden");
}

function showFavorites() {
  const view = document.getElementById("favorites-view");
  const list = document.getElementById("favorites-list");
  list.innerHTML = "";

  if (favorites.length === 0) {
    list.innerHTML = "<p>No favorites yet!</p>";
  } else {
    favorites.forEach((strain) => {
      list.innerHTML += `
        <div class="favorite-strain">
          <h4>${strain.name}</h4>
          <p>${strain.about}</p>
          <small>Price: ${strain.price} | Rating: ${strain.rating}</small>
        </div>
      `;
    });
  }

  view.classList.remove("hidden");
}

document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));
document.getElementById("viewProfile").addEventListener("click", showCurrentProfile);
document.getElementById("viewFavorites").addEventListener("click", showFavorites);

showNextStrain();
