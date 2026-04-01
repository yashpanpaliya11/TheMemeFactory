let memes = [];
let currentMeme = null;

// Fetch memes (same as your fetch.jsx)
async function getMemes() {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json = await res.json();
    return json.data.memes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Show random meme
function showRandomMeme() {
  if (memes.length === 0) return;

  const randomIndex = Math.floor(Math.random() * memes.length);
  currentMeme = memes[randomIndex];

  document.getElementById("memeTitle").textContent = currentMeme.name;
  document.getElementById("memeImage").src = currentMeme.url;
  document.getElementById("memeImage").alt = currentMeme.name;

  document.getElementById("memeCard").style.display = "block";
}

// Initial load (like useEffect)
window.onload = async function () {
  memes = await getMemes();
  showRandomMeme();
};

// Button click
document.getElementById("refreshBtn").addEventListener("click", showRandomMeme);