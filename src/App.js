import React, { useState, useEffect } from "react";
import "h8k-components";
import Table from "./components/Table";
import { cryptocurrencyList } from "./Cryptocurrency-list";

let title = 'Crypto Currency Exchange';

function App() {
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState(10000);
  const [error, setError] = useState("");
  const [coins, setCoins] = useState([
    { code: "BNB", coins: 0 },
    { code: "BTC", coins: 0 },
    { code: "DOGE", coins: 0 },
    { code: "ETH", coins: 0 },
    { code: "XRP", coins: 0 },
  ]);

  const handleAmountChange = (e) => {
    const enteredAmt = e.target.value.trim();
  
    if (enteredAmt === "") {
      // Handle empty input
      setError("Amount cannot be empty");
    } else {
      const parsedAmount = parseFloat(enteredAmt);
  
      if (isNaN(parsedAmount)) {
        // Handle invalid input (e.g., non-numeric values)
        setError("Amount must be a valid number");
      } else if (parsedAmount < 0.01) {
        // Handle amount less than $0.01
        setError("Amount cannot be less than $0.01");
      } else if (parsedAmount > balance) {
        // Handle amount greater than available balance
        setError("Amount cannot exceed the available balance");
      } else {
        // If no errors, clear the error message and update state
        setError(""); 
        setAmount(parsedAmount);
        setBalance(balance - parsedAmount); // Subtract from balance
      }
    }
  };
  

  useEffect(() => {
    if (amount !== null) {
      // Update the coins with the amount and rates
      const updatedCoins = coins.map((item) => {
        const currency = cryptocurrencyList.find((value) => value.code === item.code);
        const calCoins = currency ? (amount * currency.rate) : 0;
        return { ...item, coins: calCoins };
      });
      setCoins(updatedCoins);
    }
  }, [amount, coins]);

  return (
    <div className="layout-column align-items-center mx-auto">
      <h8k-navbar header={title}></h8k-navbar>
      <h1>CryptoRank Exchange</h1>
      <section>
        <div className="card-text layout-column align-items-center mt-12 px-8 flex text-center">
          <label>
            I want to exchange $ <input
              className="w-10"
              data-testid="amount-input"
              required
              type="number" // Use number type for input
              placeholder="USD"
              value={amount === null ? "" : amount}
              onChange={handleAmountChange}
            />  of my $
            <span>{balance}</span>:
          </label>
          {error.length > 0 && (<p data-testid="error" className="form-hint error-text mt-3 pl-0 ml-0">
            {error}
          </p>)}
          {/* The errors can be Amount cannot be empty /be less than $0.01/exceed the available balance */}
        </div>
      </section>
      <Table coins={coins} error={error} />
    </div>
  );
}

export default App;
