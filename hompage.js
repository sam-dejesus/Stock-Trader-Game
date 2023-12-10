var stockBtn = document.getElementById("stockBtn");
var searchedStock = document.getElementById("searchedStock"); // Corrected the ID

stockBtn.addEventListener("click", performSearch); // Changed to performSearch

function getStocks() {
    // Get stocks from local storage
    const stocksString = localStorage.getItem("stocks");

    if (stocksString) {
        // Parse the JSON string to an array
        const stocks = JSON.parse(stocksString);

        // Get the stock list container
        const stockListContainer = document.getElementById('stock-list');

        // Clear existing content
        stockListContainer.innerHTML = "";

        // Loop through each stock and add it to the list
        stocks.forEach(stock => {
            const listItem = document.createElement('li');
            listItem.textContent = stock;
            stockListContainer.appendChild(listItem);
        });
    }
}

async function performSearch() {
    // Get the search term from the input field
    var searchTerm = document.getElementById('search-input').value;

    // Construct the URL with the search term
    const url = 'https://realstonks.p.rapidapi.com/' + searchTerm;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c2730b7aefmshb7788edd0bc6881p15b0ecjsn003727cbc52a',
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
        }
    };

    // Declare result variable outside the try block
    let result;

    try {
        // Fetch data from the API
        const response = await fetch(url, options);
        console.log(response)
        result = await response.json(); // Parse response as JSON
        console.log(result);

        // Create elements for displaying stock information
        var stockDiv = document.createElement('div');
        var stockName = document.createElement('h4');
        var stockPrice = document.createElement('p');
        var buyBtn = document.createElement('button')
        buyBtn.innerHTML= "BUY"
        stockPrice.innerHTML = 'Price: ' + result.price; // Access result properties
        stockName.innerHTML = 'Name: ' + searchTerm;

        stockDiv.appendChild(stockName);
        stockDiv.appendChild(stockPrice);
        stockDiv.classList.add("stockDiv")
      
        searchedStock.appendChild(stockDiv, buyBtn);
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
}



