let memes = [];

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

function showRandomMeme() {
  const randomIndex = Math.floor(Math.random() * memes.length);
  const meme = memes[randomIndex];

  document.getElementById("memeTitle").textContent = meme.name;
  document.getElementById("memeImage").src = meme.url;
}

window.onload = async function () {
  memes = await getMemes();
  showRandomMeme();
};

document
  .getElementById("refreshBtn")
  .addEventListener("click", showRandomMeme);