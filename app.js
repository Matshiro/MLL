
const booksReadValue = document.getElementById("infoRead");
const booksUnreadValue = document.getElementById("infoUnread");
const booksTotalValue = document.getElementById("infoTotal");
const booksTotalPagesValue = document.getElementById("infoTotalPages");

const booksGrid = document.getElementById("booksGrid");
const sorting = document.getElementById("sortBy");

let myLibrary = [];
let totalBooks = 0;
let totalPages = 0;
let booksRead = 0;
let booksUnread = 0;
let selectedSort = "nameOfBook";

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

    selectSort();

    event.target.reset();
}

sorting.addEventListener("change", function(){
    selectedSort = this.value;
    selectSort();
});

function selectSort(){


    if (selectedSort === "nameOfBook"){
        sortArray(0);
    }
    if (selectedSort === "nameOfAuthor"){
        sortArray(1);
    }
    if (selectedSort === "bookPublished"){
        sortArray(2);
    }
}

function sortArray(value){
    if (myLibrary.length <= 0){
        createBox();
        return;
    }

    myLibrary.sort((a, b) => {
        const nameA = a[value][0].toUpperCase();
        const nameB = b[value][0].toUpperCase();
        return nameA.localeCompare(nameB);
    });
    removeExistingBoxes();
    createBox();
    addBook();
}

function removeExistingBoxes(){
    while (booksGrid.firstChild) {
        booksGrid.removeChild(booksGrid.firstChild);
      }
}

function createBox(){

    myLibrary.forEach(element => {
        let newGridBox = document.createElement("div");
        let title = element[0];
        let author = element[1];
        let published = element[2];
        let pages = element[3];
        let read = element[4];

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

        booksGrid.appendChild(newGridBox);

        });

}

function addBook(){
    totalBooks = 0;
    totalPages = 0;
    booksRead = 0;
    booksUnread = 0;
    myLibrary.forEach(element => {
        
        addTotal();
        addPages(element[3]);
        console.log(element[4]);
        if (element[4] === "no"){
            addUnread();
        }
        if (element[4] === "yes"){
            addRead();
        }
    });
}

function addRead(){
    booksRead++;
    booksReadValue.lastChild.textContent = booksRead;
}

function addUnread(){
    booksUnread++;
    booksUnreadValue.lastChild.textContent = booksUnread;
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
    if (read === "no"){
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
    booksUnreadValue.lastChild.textContent = booksUnread;
}

function removePages(pages){
    totalPages -= parseInt(pages);
    booksTotalPagesValue.lastChild.textContent = totalPages;

}

function removeTotal(){
    totalBooks--;
    booksTotalValue.lastChild.textContent = totalBooks;
}