const container = document.querySelector(".books-container");

//Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let myLibrary = [];

/////////////////////////////////////////////////////////////////

/*
  Code below is placeholder data to test that the books are able
  to be displayed from the array
*/

let book1 = new Book("Harry Potter", "Muhammad C", 284, "read");
addBookToLibrary(book1);

/*
  Note: With the way the code is currently setup, the displayBooks
  method will only run once. So, will need to call it each time any changes 
  are made
*/
displayBooks();

/////////////////////////////////////////////////////////////////

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  let i = 0;

  while (myLibrary.length > 0 && i < myLibrary.length) {
    //Display books
    let titleTxt = createTxt("Title", myLibrary[i].title);
    let authorTxt = createTxt("Author", myLibrary[i].author);
    let pagesTxt = createTxt("Pages", myLibrary[i].pages);
    let book = createBookContainer();
    let btnDivContainer = createBtnContainer(myLibrary[i].read);
    book.appendChild(titleTxt);
    book.appendChild(authorTxt);
    book.appendChild(pagesTxt);
    book.appendChild(btnDivContainer);
    container.appendChild(book);

    i++;
  }
}

function createTxt(context, text) {
  let h2 = document.createElement("h2");
  h2.textContent = `${context}: ${text}`;
  return h2;
}

function createBookContainer() {
  let book = document.createElement("div");
  book.classList.add("book");
  return book;
}

function createBtn(text, className) {
  let btn = document.createElement("button");
  let btnTextNode = document.createTextNode(text);
  btn.type = "button";
  btn.classList.add(className);
  btn.appendChild(btnTextNode);
  return btn;
}

function createBtnContainer(read) {
  let readBtn = createBtn(read, "read-btn");
  let deleteBtn = createBtn("Delete", "remove-btn");
  let btnDivContainer = document.createElement("div");
  btnDivContainer.classList.add("btn-container");
  btnDivContainer.appendChild(readBtn);
  btnDivContainer.appendChild(deleteBtn);
  return btnDivContainer;
}
