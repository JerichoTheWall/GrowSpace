const strains = [
  {
    id: 1,
    name: "Green Crack",
    image: "https://images.unsplash.com/photo-1616530940355-b53f2e7c9efc",
    about: "Energizing daytime sativa",
    likes: ["Uplifting", "Focused", "Creative"],
    dislikes: ["Dry mouth", "Paranoia"],
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
    about: "Balanced hybrid with calming effects",
    likes: ["Relaxed", "Happy", "Pain Relief"],
    dislikes: ["Dry eyes"],
    terpenes: ["Myrcene", "Caryophyllene"],
    rating: 4.5,
    price: "$22/g",
    deal: "Buy 1g get 1 free",
    seenCount: 0
  },
  {
    id: 3,
    name: "OG Kush",
    image: "https://images.unsplash.com/photo-1617191518007-cc219b41d5a9",
    about: "Heavy indica with relaxing effects",
    likes: ["Sleepy", "Hungry", "Relaxed"],
    dislikes: ["Couch-lock", "Dry mouth"],
    terpenes: ["Linalool", "Humulene"],
    rating: 4.6,
    price: "$30/g",
    deal: "Buy 3.5g, get a pre-roll",
    seenCount: 0
  },
  {
    id: 4,
    name: "Pineapple Express",
    image: "https://images.unsplash.com/photo-1617957747486-0f11e370a760",
    about: "Sativa-dominant strain with fruity flavor",
    likes: ["Happy", "Talkative", "Energetic"],
    dislikes: ["Dry eyes"],
    terpenes: ["Caryophyllene", "Limonene"],
    rating: 4.8,
    price: "$27/g",
    deal: "Free sample with first order",
    seenCount: 0
  }
];

let favorites = [];
let lineup = [...strains];
lineup.sort(() => Math.random() - 0.5);
let currentIndex = 0;

function loadStrainCard(strain) {
  const swipeArea = document.getElementById("swipe-area");
  swipeArea.innerHTML = `
    <div class="strain-card">
      <img src="${strain.image}" class="strain-image" />
      <div class="strain-info">
        <h2>${strain.name}</h2>
        <p>${strain.about}</p>
        <p><strong>Likes:</strong> ${strain.likes.join(", ")}</p>
        <p><strong>Dislikes:</strong> ${strain.dislikes.join(", ")}</p>
        <p><strong>Terpenes:</strong> ${strain.terpenes.join(", ")}</p>
        <p><strong>Rating:</strong> ${strain.rating}</p>
        <p><strong>Price:</strong> ${strain.price}</p>
        <p><strong>Deal:</strong> ${strain.deal}</p>
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
  const card = document.querySelector(".strain-card");
  if (!card || lineup.length === 0) return;

  const strain = lineup[currentIndex];

  if (direction === "up") {
    showFavorites();
    return;
  }

  card.style.transform =
    direction === "left"
      ? "translateX(-100%) rotate(-15deg)"
      : "translateX(100%) rotate(15deg)";

  setTimeout(() => {
    card.style.transform = "none";

    if (direction === "right") {
      favorites.push(strain);
    } else if (direction === "left") {
      strain.seenCount += 1;
      if (Math.random() < 0.3) {
        lineup.push(strain);
      }
    }

    lineup.splice(currentIndex, 1);
    showNextStrain();
  }, 300);
}

function showFavorites() {
  const favView = document.getElementById("favorites-view");
  const favList = document.getElementById("favorites-list");

  favList.innerHTML = "";

  if (favorites.length === 0) {
    favList.innerHTML = "<p>No favorites yet!</p>";
  } else {
    favorites.forEach((strain) => {
      const item = document.createElement("div");
      item.classList.add("favorite-strain");
      item.innerHTML = `
        <h4>${strain.name}</h4>
        <div class="details hidden">
          <p><strong>About:</strong> ${strain.about}</p>
          <p><strong>Likes:</strong> ${strain.likes.join(", ")}</p>
          <p><strong>Dislikes:</strong> ${strain.dislikes.join(", ")}</p>
          <p><strong>Terpenes:</strong> ${strain.terpenes.join(", ")}</p>
          <p><strong>Rating:</strong> ${strain.rating}</p>
          <p><strong>Price:</strong> ${strain.price}</p>
          <p><strong>Deal:</strong> ${strain.deal}</p>
        </div>
      `;

      item.addEventListener("click", () => {
        item.classList.toggle("open");
        const details = item.querySelector(".details");
        details.classList.toggle("hidden");
      });

      favList.appendChild(item);
    });
  }

  favView.classList.remove("hidden");
}

// Keyboard test swipes (for desktop debugging)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") swipe("right");
  if (e.key === "ArrowLeft") swipe("left");
  if (e.key === "ArrowUp") swipe("up");
});

document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));

showNextStrain();
