
const booksReadValue = document.getElementById("infoRead");
const booksUnreadValue = document.getElementById("infoUnread");
const booksTotalValue = document.getElementById("infoTotal");
const booksTotalPagesValue = document.getElementById("infoTotalPages");

const booksGrid = document.getElementById("booksGrid");


let myLibrary = [];
let totalBooks = 0;
let totalPages = 0;
let booksRead = 0;
let booksUnread = 0;


function handleSubmit(event){

    event.preventDefault();
    const formData = new FormData(event.target);

    const bookTitle = formData.get("title")
    const bookAuthor = formData.get("author");
    const bookPublished = formData.get("published");
    const bookPages = formData.get("pages");
    const bookRead = formData.get("bookRead");

    let book = [bookTitle, bookAuthor, bookPublished, bookPages, bookRead]
    myLibrary.push(book);

    addNewBook(bookTitle, bookAuthor, bookPublished, bookPages, bookRead);

    event.target.reset();
}


function addNewBook(title, author, published, pages, read){

    let newGridBox = document.createElement("div");
    newGridBox.className = "gridBox";
    newGridBox.id = title;
    if (read != "no"){
        newGridBox.classList.add("read");
        addRead();
    }
    else{
        newGridBox.classList.add("unread");
        addUnread();
    }

    addPages(pages);
    addTotal();

    var bookTitle = document.createElement("div");
    bookTitle.className = "boxRow";
    bookTitle.id = "bookTitle";
    bookTitle.textContent = title;
    newGridBox.appendChild(bookTitle);
    
    var bookAuthor = document.createElement("div");
    bookAuthor.className = "boxRow";
    bookAuthor.id = "bookAuthor";
    bookAuthor.textContent = author;
    newGridBox.appendChild(bookAuthor);
    
    var bookPublished = document.createElement("div");
    bookPublished.className = "boxRow";
    bookPublished.id = "bookPublished";
    bookPublished.textContent = published;
    newGridBox.appendChild(bookPublished);
    
    var bookPagesNr = document.createElement("div");
    bookPagesNr.className = "boxRow";
    bookPagesNr.id = "bookPagesNr";
    bookPagesNr.textContent = parseInt(pages);
    newGridBox.appendChild(bookPagesNr);
    
    var bookDelete = document.createElement("button");
    bookDelete.className = "bookDelete";
    bookDelete.addEventListener('click', function(){
        let gridBox = bookDelete.closest('.gridBox');
        removeBook(title, pages, read);
        gridBox.remove();
    })

    var trashbin = document.createElement("img");
    trashbin.id = "trashbin";
    trashbin.src = "./images/trashbin.png";
    trashbin.alt = "Trashbin icon";
    bookDelete.appendChild(trashbin);
    newGridBox.appendChild(bookDelete);

    console.log(newGridBox);
    booksGrid.appendChild(newGridBox);


}

function addRead(){
    booksRead++;
    booksReadValue.lastChild.textContent = booksRead;
}

function addUnread(){
    booksUnread++;
    booksUnreadValue.lastChild.textContent = booksRead;
}

function addPages(pages){
    totalPages += parseInt(pages);
    booksTotalPagesValue.lastChild.textContent = totalPages;

}

function addTotal(){
    totalBooks++;
    booksTotalValue.lastChild.textContent = totalBooks;
}

function removeBook(title, pages, read){
    if (read === "yes"){
        removeRead();
    }
    else{
        removeUnread();
    }
    removePages(pages);
    removeTotal();

    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i][0] === title){
            myLibrary.splice(i,1);
        }
    }
}

function removeRead(){
    booksRead--;
    booksReadValue.lastChild.textContent = booksRead;
}

function removeUnread(){
    booksUnread--;
    booksUnreadValue.lastChild.textContent = booksRead;
}

function removePages(pages){
    totalPages += parseInt(pages);
    booksTotalPagesValue.lastChild.textContent = totalPages;

}

function removeTotal(){
    totalBooks--;
    booksTotalValue.lastChild.textContent = totalBooks;
}