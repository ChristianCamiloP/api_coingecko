import React, { useState, useEffect } from "react";
import "./index.css";
import { Star, StarOff } from "lucide-react";

export default function CryptoApp() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
      .then((res) => res.json())
      .then((data) => setCryptos(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredCryptos = cryptos.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedCryptos = tab === "favorites"
    ? filteredCryptos.filter((coin) => favorites.includes(coin.id))
    : filteredCryptos;

  return (
    <div className="contenedor">
      <input
        type="text"
        placeholder="Buscar criptomoneda..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="buscador"
      />

      <div className="tabs">
        <button className={`tab-btn ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>Todas</button>
        <button className={`tab-btn ${tab === "favorites" ? "active" : ""}`} onClick={() => setTab("favorites")}>Favoritas</button>
        <button className={`tab-btn ${tab === "top" ? "active" : ""}`} onClick={() => setTab("top")}>Top</button>
        <button className={`tab-btn ${tab === "gainers" ? "active" : ""}`} onClick={() => setTab("gainers")}>Ganadoras</button>
        <button className={`tab-btn ${tab === "losers" ? "active" : ""}`} onClick={() => setTab("losers")}>Perdedoras</button>
        <button className={`tab-btn ${tab === "stable" ? "active" : ""}`} onClick={() => setTab("stable")}>Estables</button>
      </div>

      <div>
        {displayedCryptos.map((coin) => (
          <div key={coin.id} className="tarjeta">
            <div className="fila">
              <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24 }} />
              <div>
                <div><strong>{coin.name}</strong></div>
                <div style={{ fontSize: 14, color: '#777' }}>${coin.current_price.toLocaleString()}</div>
              </div>
            </div>
            <button className="icon-btn" onClick={() => toggleFavorite(coin.id)}>
              {favorites.includes(coin.id) ? <Star color="gold" size={20} /> : <StarOff size={20} />}
            </button>
          </div>
        ))}
      </div>

      <div className="menu-inferior">
        <button className={tab === "all" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("all")}>Todas</button>
        <button className={tab === "favorites" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("favorites")}>Favoritas</button>
        <button className={tab === "top" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("top")}>Top</button>
        <button className={tab === "gainers" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("gainers")}>Ganadoras</button>
        <button className={tab === "losers" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("losers")}>Perdedoras</button>
        <button className={tab === "stable" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("stable")}>Estables</button>
      </div>
    </div>
  );
}
