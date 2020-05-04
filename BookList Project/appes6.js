class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    addBook(book){
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a class="delete"><i class="window close icon"></i></a></td>`;
        const list = document.querySelector('.book-list');
        list.appendChild(row);
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    showAlert(message,className){
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
    removeBook(target){
        Store.removeBookFromLS(target.parentElement.parentElement.previousElementSibling.textContent);
        if(target.parentElement.className === "delete"){
            target.parentElement.parentElement.parentElement.remove();
        }
    }
}
class Store{
    static getBooks(){
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
    static addBooksToLs(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBookFromLS(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBook(book);
        });
    }
    static removeBookFromLS(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }

}

// event listeners
document.addEventListener('DOMContentLoaded',Store.displayBookFromLS());
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
        Store.addBooksToLs(book);
        ui.clearFields();
        ui.showAlert('Book added Successfully','positive');
    }
    e.preventDefault();
});

// remove on click event 
document.querySelector('.book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.removeBook(e.target);
    
    ui.showAlert('Book Removed','warning')
    e.preventDefault();
})