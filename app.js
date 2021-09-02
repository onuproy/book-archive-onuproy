
const searchfield = document.getElementById('search-field');
const errorMessage = document.getElementById('error');
const searchResult = document.getElementById('search-result');
const errorfound = document.getElementById('error-found');
const totalresult = document.getElementById('total-result');

// Search book 
const searchBook = () => {
    const searchText = searchfield.value;
    console.log(searchText);
    searchfield.value = '';
    if (searchText == "") {
        errorMessage.innerText = "Please type input";
        searchResult.textContent = '';
        errorfound.innerText = "";
        totalresult.innerText = "";
    }
    else {
        errorMessage.innerText = ""
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayBookResult(data.docs))
    }
}
// Display book 
const displayBookResult = books => {
    searchResult.textContent = '';
    if (books.length == 0) {
        errorfound.innerText = "Not Found";
        searchResult.textContent = '';
    }
    else {
        errorfound.innerText = "";
        totalresult.innerText = "";
        books.forEach(book => {
            //total result
            totalresult.innerText = ` ${books.length} result showing`;
            const divcreate = document.createElement('div');
            divcreate.classList.add('col-sm-4');
            divcreate.innerHTML = `
            <div class="card">
              <div class="card-body">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                <h5 class="card-title">${book.title}</h5>
                <span>By: ${book.author_name[0]}</span>
                <span>Publisher :${book.publisher_facet}</span>
                <span>First Published in: ${book.first_publish_year}</span>
              </div>
            </div>`;
            searchResult.appendChild(divcreate);
        })
    }

}