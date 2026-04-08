let memes = [];
let filteredMemes = [];

const grid = document.getElementById("memeGrid");
const searchInput = document.getElementById("searchInput");
const topBtn = document.getElementById("topBtn");
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "Light Mode";
  } else {
    toggleBtn.textContent = "Dark Mode";
  }
});

async function getMemes() {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json = await res.json();

    memes = json.data.memes;
    filteredMemes = memes;

    renderMemes(filteredMemes);
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}


function renderMemes(list) {
  grid.innerHTML = list.map(meme => `
    <div class="memeCard">
      <img src="${meme.url}" alt="${meme.name}" />
      <p>${meme.name}</p>
      <button class="shareBtn" data-url="${meme.url}">
        Share
      </button>
    </div>
  `).join("");
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  filteredMemes = memes.filter(m =>
    m.name.toLowerCase().includes(keyword)
  );

  renderMemes(filteredMemes);
});


document.querySelectorAll("#categories button").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;

    if (cat === "all") {
      filteredMemes = memes;
    } 
    else if (cat === "funny") {
      filteredMemes = memes.filter(m =>
        m.name.toLowerCase().includes("dog") ||
        m.name.toLowerCase().includes("cat") ||
        m.name.toLowerCase().includes("baby")
      );
    } 
    else if (cat === "classic") {
      filteredMemes = memes.filter(m =>
        m.name.toLowerCase().includes("drake") ||
        m.name.toLowerCase().includes("boyfriend") ||
        m.name.toLowerCase().includes("one does not")
      );
    }

    renderMemes(filteredMemes);
  });
});


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("shareBtn")) {
    const url = e.target.dataset.url;

    navigator.clipboard.writeText(url)
      .then(() => alert("Link copied"))
      .catch(() => alert("Failed "));
  }
});


getMemes();