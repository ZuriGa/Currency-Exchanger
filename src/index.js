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
  const resultContainer = document.querySelector('#displayResults');
  resultContainer.innerText = `Here is the current rate for $${usd}.`;

  for(const [currency, rate] of Object.entries(response.conversion_rates)) {
    const listItems = document.createElement("li");
    listItems.textContent = `${currency}: ${rate}`;
    resultContainer.appendChild(listItems);
  }
}

function printError(error, usd) {
    let errorMessage = '';
    
    if (!usd || !isValidUsd(usd)) {
        errorMessage = `Invalid currency: ${usd}. Please enter a valid currency.`;
    } else {
        errorMessage = `There was an error accessing your currency exchange for ${usd}: ${error}`
    }
    document.querySelector('#displayResults').innerText = errorMessage;
}

function isValidUsd(usd) {
    return usd.length >= 0;
}

function handleFormSubmission(e) {
    e.preventDefault();
    const usd = document.querySelector('#currency').value;
    document.querySelector('#currency').value;

    if(isValidUsd(usd)) {
        getCurrency(usd);
    } else {
        printError('Invalid currency. Please enter a valid amount.', usd);
    }
}

window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});