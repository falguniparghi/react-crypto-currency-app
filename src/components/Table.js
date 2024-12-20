import React from "react";
import { cryptocurrencyList } from "../Cryptocurrency-list";

function Table({ coins, error }) {
  
  return (
    <div className="card card-text mt-10 mx-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Exchange Rate</th>
            <th>Number of Coins</th>
          </tr>
        </thead>
        <tbody data-testid="exchange-data">
          {cryptocurrencyList.map((currency) => {
            const selectedIndex = coins.findIndex((coin) => coin.code == currency.code);
            const number = selectedIndex !== -1 ? coins[selectedIndex].coins : 0;
            
            const formattedNumber = number.toFixed(8);
            return (
              <tr key={currency.code}>
                <td>{currency.name}</td>
                <td>1 USD = {currency.rate}</td>
                <td>{error.length === 0 ? formattedNumber : "n/a"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
