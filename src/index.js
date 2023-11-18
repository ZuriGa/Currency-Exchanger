import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyEx.js';

async function getCurrency(usd) {
  const response = await CurrencyExchange.getCurrency(usd);
  if (response) {
    printElements(response, usd);
  } else {
    printError(response, usd);
  }
} 

// UI Logic
function printElements(response, usd) {
  document.querySelector('#displayResults').innerText = `Here is the current rate for ${usd}.`;
  const resultContainer = document.querySelector('#displayResults');
  response.forEach(function(currency){
    const listItem = document.createElement("li");
    listItem.textContent = `Conversion Rate: ${currency.conversion_rates}.`;
    resultContainer.appendChild(listItem);
  });
}