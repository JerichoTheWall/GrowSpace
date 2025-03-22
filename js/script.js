const strains = [
  {
    name: "Green Crack",
    image: "https://images.unsplash.com/photo-1616530940355-b53f2e7c9efc",
    about: "Energizing daytime sativa",
    likes: ["Uplifting", "Focused", "Creative"],
    dislikes: ["Dry mouth", "Paranoia"],
    terpenes: ["Limonene", "Pinene"],
    rating: 4.7,
    price: "$25/g",
    deal: "10% off today"
  },
  {
    name: "Blue Dream",
    image: "https://images.unsplash.com/photo-1601612624377-47a7b67443b5",
    about: "Balanced hybrid with calming effects",
    likes: ["Relaxed", "Happy", "Pain Relief"],
    dislikes: ["Dry eyes"],
    terpenes: ["Myrcene", "Caryophyllene"],
    rating: 4.5,
    price: "$22/g",
    deal: "Buy 1g get 1 free"
  }
];

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

function swipe(direction) {
  const card = document.querySelector(".strain-card");
  if (!card) return;

  card.style.transform = direction === "left" ? "translateX(-100%) rotate(-15deg)" : "translateX(100%) rotate(15deg)";
  
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % strains.length;
    loadStrainCard(strains[currentIndex]);
  }, 300);
}

document.getElementById("swipeLeft").addEventListener("click", () => swipe("left"));
document.getElementById("swipeRight").addEventListener("click", () => swipe("right"));

// Load first strain
loadStrainCard(strains[currentIndex]);
