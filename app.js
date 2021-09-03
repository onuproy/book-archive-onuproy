
const searchfield = document.getElementById('search-field');
const errorMessage = document.getElementById('error');
const searchResult = document.getElementById('search-result');
const errorfound = document.getElementById('error-found');
const totalresult = document.getElementById('total-result');

//spinner
const togglespinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchBook = () => {
    const searchText = searchfield.value;
    console.log(searchText);
    searchfield.value = '';
    togglespinner('block');
    if(searchText == ""){
        //error message
        errorMessage.innerText = "Please type Something";
        //clear data
        searchResult.textContent ='';
        errorfound.innerText = "";
        totalresult.innerText = "";
        togglespinner('none');
    }
    else{
        //clear data
        errorMessage.innerText = ""
        errorfound.innerText = "";
        totalresult.innerText = "";
        searchResult.textContent ='';
        //data load
        const url =  `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayBookResult(data.docs,data.numFound))
    }
}
//display result
const displayBookResult = (booksdetails,totalresultshow) => {
    //filter
    const books = booksdetails.filter(details => details.cover_i !== undefined && details.title !== undefined && details.author_name !== undefined && details.publisher_facet !== undefined && details.first_publish_year !== undefined);
    searchResult.textContent ='';
    if(books.length == 0){
        //error
        errorfound.innerText = "No Result Found";
        //clear data
        searchResult.textContent ='';
        totalresult.innerText = "";
        togglespinner('none');
    }
    else{
        errorfound.innerText = "";
        totalresult.innerText = "";
        books.forEach(book => {
            //total result
            totalresult.innerText = `${totalresultshow} result found showing ${books.length} result`;
            const divcreate = document.createElement('div');
            divcreate.classList.add('col-sm-4');
            divcreate.innerHTML = `
            <div class="card">
              <div class="card-body">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                <div class="right-content">
                <h5 class="card-title">${book.title}</h5>
                <span>By: <b>${book.author_name[0]}</b></span>
                <span>Publisher: <b>${book.publisher_facet[0]}</b></span>
                <span>First Plublished in: <b>${book.first_publish_year}</b></span>
                </div>
              </div>
            </div>`;
            searchResult.appendChild(divcreate);
            togglespinner('none');
        })
    }
   
}