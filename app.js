const searchBook = () => {
    const searchfield = document.getElementById('search-field');
    const errorMessage = document.getElementById('error');
    const searchText = searchfield.value;
    console.log(searchText);
    searchfield.value = '';
    if(searchText == ""){
        errorMessage.innerText = "Please type input";
        searchResult.textContent ='';
    }
    else{
        errorMessage.innerText = ""
        const url =  `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayBookResult(data.docs))
    }
}
const displayBookResult = books => {
    const searchResult = document.getElementById('search-result');
    const errorMessages = document.getElementById('error1');
    searchResult.textContent ='';
    if(books.length == 0){
        errorMessages.innerText = "Not Found";
        searchResult.textContent ='';
    }
    else{
        errorMessages.innerText = "";
        books.forEach(book => {
            console.log(book);
            const divcreate = document.createElement('div');
            divcreate.classList.add('col-sm-4');
            divcreate.innerHTML = `
            <div class="card">
              <div class="card-body">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                <h5 class="card-title">${book.title}</h5>
                <span>${book.author_name}</span>
                <span>${book.publisher_facet}</span>
                <span>${book.first_publish_year}</span>
              </div>
            </div>`;
            searchResult.appendChild(divcreate);
        })
    }
   
}