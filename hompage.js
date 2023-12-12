
var searchedStock = document.getElementById("searchedStock"); 


// document.addEventListener("DOMContentLoaded", function() {
//     getStocks(); 
// });
// function getStocks() {
  
//     const stocksString = localStorage.getItem("myStocks");

//     if (stocksString) {
   
//         const stocks = JSON.parse(stocksString);


//         const stockListContainer = document.getElementById('stock-list');


//         stockListContainer.innerHTML = "";

//         stocks.forEach(stock => {
//             const listItem = document.createElement('li');
//             listItem.textContent = stock;
//             stockListContainer.appendChild(listItem);
//         });
//     }
// }

let stockData = []; 

async function performSearch() {

    var searchTerm = document.getElementById('search-input').value;


    const url = 'https://realstonks.p.rapidapi.com/' + searchTerm;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c2730b7aefmshb7788edd0bc6881p15b0ecjsn003727cbc52a',
            'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
        }
    };

    let result;

    try {
    
        const response = await fetch(url, options);
        console.log(response)
        result = await response.json(); 
        console.log(result);

        
        var stockDiv = document.createElement('div');
        var stockName = document.createElement('h4');
        var stockPrice = document.createElement('p');
        var buyBtn = document.createElement('button')
        buyBtn.innerHTML= "BUY"
        stockPrice.innerHTML = 'Price: ' + result.price; 
        stockName.innerHTML = 'Name: ' + searchTerm;

        stockDiv.appendChild(stockName);
        stockDiv.appendChild(stockPrice);
        stockDiv.classList.add("stockDiv")
      
        searchedStock.appendChild(stockDiv);
        searchedStock.appendChild(buyBtn);

        stockData.push({
            name: searchTerm,
            price: result.price,
            owned: 0
        });
        buyBtn.addEventListener("click", ()=>{

            const existingStockIndex = stockData.findIndex(stock => stock.name === searchTerm);

            if (existingStockIndex !== -1) {
                
                stockData[existingStockIndex].owned += 1;
            } else {
                
                stockData.push({
                    name: searchTerm,
                    price: result.price,
                    owned: 1 
                });
            }

            localStorage.setItem('myStocks', JSON.stringify(stockData));
        })
        
    } catch (error) {
        console.error(error);
        
    }
}



