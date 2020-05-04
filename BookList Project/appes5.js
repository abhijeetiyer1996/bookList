function Book(title,author,isbn)
{
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
function UI(){}
function Store(){}
UI.prototype.addBook = function(book){
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.isbn}</td>
                     <td><a class="delete"><i class="window close icon"></i></a></td>`;
    const list = document.querySelector('.book-list');
    list.appendChild(row);
    
}
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.showAlert = function(message,className){
    const div = document.createElement('div')
    const header = document.createElement('div');
    const bookContainer = document.querySelector('.bookContainer');
    const form = document.getElementById('book-form');
    div.className = `ui ${className} message`;
    header.className = 'header';
    header.appendChild(document.createTextNode(message));
    div.appendChild(header);
    bookContainer.insertBefore(div,form);
    setTimeout(function(){
        div.remove();
    },3000);
}
UI.prototype.removeBook = function(target){
    const store = new Store();
    store.removeBookFromLS(target.parentElement.parentElement.previousElementSibling.textContent);
    if(target.parentElement.className === "delete"){
        target.parentElement.parentElement.parentElement.remove();
    }
}

Store.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books') === null)
    {
        books = [];
    }
    else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

Store.prototype.addBooksToLs = function(book){
    books = Store.prototype.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}
Store.prototype.displayBookFromLS = function(){
    books = Store.prototype.getBooks();
    console.log(books);
    books.forEach(function(book){
        const ui = new UI();
        ui.addBook(book);
    });
}
Store.prototype.removeBookFromLS = function(isbn){
    books = Store.prototype.getBooks();
    books.forEach(function(book,index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}
//event listeners
document.addEventListener('DOMContentLoaded',Store.prototype.displayBookFromLS());
document.getElementById('book-form').addEventListener('submit',function(e){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);
    const ui = new UI();
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please enter the details','negative');
    }
    else{
        ui.addBook(book);
        const store = new Store();
        store.addBooksToLs(book);
        ui.clearFields();
        ui.showAlert('Book added Successfully','positive');
    }
    e.preventDefault();
});

// remove on click event 
document.querySelector('.book-list').addEventListener('click',function(e){
    //console.log(e.target)
    const ui = new UI();
    ui.removeBook(e.target);
    
    ui.showAlert('Book Removed','warning')
    e.preventDefault()
})
