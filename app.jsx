import { useEffect, useState } from "react";
import { getMemes } from "./fetch";

function App() {
  const [data, setData] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);

  function getRandomMeme(memes) {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setRandomMeme(memes[randomIndex]);
  }

  return (
    <div className="container">
      <h1 className="title">Meme Factory</h1>

      {randomMeme && (
        <div className="card">
          <p>{randomMeme.name}</p>
          <img src={randomMeme.url} alt={randomMeme.name}  />
        </div>
      )}

      <button onClick={() => getRandomMeme(data)}>
        Refresh Meme
      </button>
    </div>
  );
}

export default App;