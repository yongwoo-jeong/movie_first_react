import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [targetCoin, setTargetCoin] = useState("");
  const [balance, setBalance] = useState("");
  const onDecide = (e) => setTargetCoin(e.target.value);
  const handleInput = (e) => {
    setBalance(e.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(targetCoin);
  console.log(balance);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <hr />
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onDecide} value={targetCoin}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): $
              {Math.round((coin.quotes.USD.price * 100) / 100)} USD
            </option>
          ))}
        </select>
      )}
      <div style={{ marginTop: "10px", marginRight: "10px" }}>
        <input
          onChange={handleInput}
          value={balance}
          placeholder="Write your Balance"
        />
        <strong>You can buy </strong>
        <h2>You can convert TO {balance / targetCoin}</h2>
      </div>
    </div>
  );
}

export default App;
