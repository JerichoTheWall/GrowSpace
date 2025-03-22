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
  }
];

let favorites = [];
let lineup = [...strains]; // Clone the original strain list
let currentIndex = 0;

// Shuffle lineup randomly once at start
lineup.sort(() => Math.random() - 0.5);

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

  card.style.transform =
    direction === "left"
      ? "translateX(-100%) rotate(-15deg)"
      : "translateX(100%) rotate(15deg)";

  setTimeout(() => {
    card.style.transform = "none";

    if (direction === "right") {
      // LIKE
      favorites.push(strain);
    } else {
      // DISLIKE
      strain.seenCount += 1;

      // 70% chance it’s removed from pool, 30% chance added back
      if (Math.random() < 0.3) {
        lineup.push(strain);
      }
    }

    // Remove from current lineup
    lineup.splice(currentIndex, 1);

    // Show next
    showNextStrain();
  }, 300);
}

document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));

// Load the first strain
showNextStrain();
