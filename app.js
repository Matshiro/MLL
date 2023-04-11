
const booksReadValue = document.getElementById("infoRead");
const booksUnreadValue = document.getElementById("infoUnread");
const booksTotal = document.getElementById("infoTotal");
const booksTotalPages = document.getElementById("infoTotalPages");

const booksGrid = document.getElementById("booksGrid");

let myLibrary = [];

function handleSubmit(event){

    event.preventDefault();
    const formData = new FormData(event.target);

    const bookTitle = formData.get("title")
    const bookAuthor = formData.get("author");
    const bookPublished = formData.get("published");
    const bookPages = formData.get("pages");
    const bookRead = formData.get("bookRead");

    addNewBook(bookTitle, bookAuthor, bookPublished, bookPages, bookRead);

    event.target.reset();
}

function addNewBook(title, author, published, pages, read){
    let book = [title, author, published, pages, read]
    myLibrary.push(book);
    
    let newGridBox = document.createElement("div");
    newGridBox.className = "gridBox";
    newGridBox.id = title;
    if (read != "no"){
        newGridBox.classList.add("read");
    }
    else{
        newGridBox.classList.add("unread");
    }

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
    bookPagesNr.textContent = pages;
    newGridBox.appendChild(bookPagesNr);
    
    var bookDelete = document.createElement("button");
    bookDelete.className = "bookDelete";
    bookDelete.addEventListener('click', function(){
        let gridBox = bookDelete.closest('.gridBox');
        gridBox.remove();
    })

    var trashbin = document.createElement("img");
    trashbin.id = "trashbin";
    trashbin.src = "./images/trashbin.png";
    trashbin.alt = "Trashbin icon";
    bookDelete.appendChild(trashbin);
    newGridBox.appendChild(bookDelete);


    booksGrid.appendChild(newGridBox);
}

