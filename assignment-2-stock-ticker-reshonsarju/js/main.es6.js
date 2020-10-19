/** API key for signing the request */
const API_KEY = 'YOUR_API_HERE';
/** Alpha Vantage REST endpoint */
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

/**
 * Display the current price and other information for a stock.
 * @param {HTMLElement} el DOM element parent for the display of the data. Must
 * contain a .symbol, .price, and .date elements.
 * @param {Object} data The returned stock symbol data
 */
const displayResults = (el, data) => {
    let {'01. symbol':symbol, '05. price':price, '07. latest trading day':date} = data['Global Quote'];
    
    el.querySelector('.price').innerHTML = `$${Number(price).toFixed(2)}`;
    el.querySelector('.symbol').innerHTML = symbol.toUpperCase();
    el.querySelector('.date').innerHTML = `${date} ${date.includes(':')? date : ''}`;
};

/**
 * Handle symbol form submit to fetch the desired symbol information.
 * @param {Event} evt Event object for this listener function
 */
const fetchTickerData = (evt) => {
    evt.preventDefault();
    // get the symbol
    const symbol = evt.target.elements['symbol'].value;

    fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // log and export all data
        if (data['Error Message']) { // BONUS
            throw new Error(`There was an error fulfilling your request. Be sure you've entered a valid symbol`);
        }
        displayResults(document.querySelector('.stock-display'), data);
    })
    .catch(err => { // BONUS
        alert(`There was an error: ${err}`);
    });
};

// add the submit listener
document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);