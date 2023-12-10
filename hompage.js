


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
        result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }

   

}


