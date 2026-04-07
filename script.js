
let memes = [];
const memeImage = document.getElementById("memeImage");
const memeTitle = document.getElementById("memeTitle");


async function getMemes() {
    try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const json = await response.json();
        return json.data.memes;
    } catch (error) {
        console.error("Error fetching memes:", error);
    }
}

function showRandomMeme() {
    if (memes.length === 0) return;


    const randomIndex = Math.floor(Math.random() * memes.length);
    const meme = memes[randomIndex];


    memeTitle.textContent = meme.name;
    memeImage.src = meme.url;
}

window.onload = async () => {
    memes = await getMemes();
    showRandomMeme();
};
const refreshBtn = document.getElementById("refreshBtn");

rebu.addEventListener("click", showRandomMeme);