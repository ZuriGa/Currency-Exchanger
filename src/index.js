import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyEx.js';

async function getCurrency(fromCurrency) {
  const response = await CurrencyExchange.getCurrency(fromCurrency);
  if (response) {
    printElements(response, fromCurrency);
  } else {
    printError(response, fromCurrency);
  }
} 

function currencyDropDown(dropDownId, selectedCurrency) {
    const dropDown = document.getElementById(dropDownId);
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNH', 'HKD', 'NZD', 'BHD', 'KWD', 'IDR', 'MXN'];

    currencies.forEach((currency) => {
        const option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        dropDown.add(option);
    });

    dropDown.value = selectedCurrency;
}
// UI Logic
function convertAmount(amount, rate) {
    return (amount * rate).toFixed(2);
}
function printElements(response, fromCurrency) {
  const resultContainer = document.querySelector('#displayResults');
  resultContainer.innerHTML = '';

  const amount = parseFloat(document.querySelector('#amount').value) || 1;
  const selectedCurrency = document.querySelector('#to-currency').value;
  resultContainer.innerText = `Here is the converted amount for $${amount} ${fromCurrency}:`;


  for(const [currency, rate] of Object.entries(response.conversion_rates)) {
    if (currency === selectedCurrency) {
    const convertedAmount = convertAmount(amount, rate);
    const listItem = document.createElement("li");
    listItem.textContent = `${currency}: ${convertedAmount}`;
    resultContainer.appendChild(listItem);
    }
  }
}

function printError(error, fromCurrency) {
    let errorMessage = '';
    
    if (!fromCurrency || !isValidUsd(fromCurrency)) {
        errorMessage = `Invalid currency: ${fromCurrency}. Please enter a valid currency.`;
    } else {
        errorMessage = `There was an error accessing your currency exchange for ${fromCurrency}: ${error}`
    }
    document.querySelector('#displayResults').innerText = errorMessage;
}

function isValidUsd(fromCurrency) {
    return fromCurrency.length >= 0;
}

function handleFormSubmission(e) {
    e.preventDefault();
    const fromCurrency = document.querySelector('#from-currency').value;
    const toCurrency = document.querySelector('#to-currency').value;

    if(isValidUsd(fromCurrency)) {
        getCurrency(fromCurrency);
    } else {
        printError('Invalid currency. Please enter a valid amount.', fromCurrency);
    }
}

window.addEventListener("load", function () {
    currencyDropDown('from-currency', 'USD');
    currencyDropDown('to-currency', 'MXN');
    const submitButton = this.document.getElementById("submit");
    submitButton.addEventListener("click", handleFormSubmission);
});