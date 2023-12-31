import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currencyEx.js';

async function getCurrency(fromCurrency) {
  const response = await CurrencyExchange.getCurrency(fromCurrency);
  if (response) {
    printElements(response, fromCurrency);
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

function convertAmount(amount, rate) {
    return (amount * rate).toFixed(2);
    
}



// UI Logic

function printElements(response, fromCurrency) {
  const resultContainer = document.querySelector('#displayResults');
  resultContainer.innerHTML = '';
  const amount = parseFloat(document.querySelector('#amount').value) || 1;
  const selectedCurrency = document.querySelector('#to-currency').value;
  resultContainer.innerText = `$${amount} ${fromCurrency}:`;

  if (response.result && response.result === 'error') {
    printError(`Error: ${response.error}`, fromCurrency);
  } else if (response.conversion_rates ) {
    for(const [currency, rate] of Object.entries(response.conversion_rates)) {
    if (currency === selectedCurrency) {
    const convertedAmount = convertAmount(amount, rate);
    const listItem = document.createElement("p");
    listItem.textContent = ` = ${currency} ${convertedAmount}`;
    resultContainer.appendChild(listItem);
  }

    }
  } else {
    printError('Conversion rates not available', fromCurrency);
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
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", handleFormSubmission);

});