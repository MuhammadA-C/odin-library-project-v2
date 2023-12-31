/*

  Overview: This was a part of The Odin Project Full Stack JavaScript course.
  For this project you were supposed to create a library that allows the user to
  input books that they read or not read, and the UI updates to display the books.

  Notes: 
    1. The project instructions said to obtain the user input via a form and I didn't use one
    2. There's no input validation for the user input. (Note: Input validation wasn't explicitly stated to include)
    3. There's no check to prevent duplicate books from being added. (Note: I don't believe the instructions said to add a duplicate check)

*/

/////////////////////////////////////////////////////////////////

const container = document.querySelector(".books-container");
const addBtn = document.querySelector("#add-book-btn");

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
  Note: With the way the code is currently setup, the displayBooks
  method will only run once. So, will need to call it each time any changes 
  are made
*/
displayBooks();

/////////////////////////////////////////////////////////////////

addBtn.addEventListener("click", () => {
  let title = prompt("Enter Title:");
  let author = prompt("Enter Author:");
  let pages = prompt("Enter Pages");
  let read = prompt("Enter Read or Not Read:");

  let book = new Book(title, author, pages, read);
  addBookToLibrary(book);

  /*
    Have to reset the books displayed otherwise the books that were,
    otherwise the books already displayed will be duplicated in the DOM
  */
  resetBooksDisplayed();
  displayBooks();
});

container.addEventListener("click", (e) => {
  if (e.target.className === "remove-btn") {
    let bookIndex =
      e.target.parentElement.parentElement.getAttribute("data-array-index");
    let array = [];

    for (let i = 0; i < myLibrary.length; i++) {
      if (i == bookIndex) {
        continue;
      }
      array[i] = myLibrary[i];
    }

    clearArray(myLibrary);
    copyArrayToAnotherArray(array, myLibrary);

    //Reset & Update books displayed on page
    resetBooksDisplayed();
    displayBooks();
  }
});

container.addEventListener("click", (e) => {
  if (e.target.className === "read-btn") {
    let text = e.target.textContent;

    switch (text.toLowerCase()) {
      case "read":
        e.target.textContent = "Not Read";
        break;
      case "not read":
        e.target.textContent = "Read";
    }
  }
});

/////////////////////////////////////////////////////////////////

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  let index = 0;

  while (myLibrary.length > 0 && index < myLibrary.length) {
    //Display books
    let titleTxt = createTxt("Title", myLibrary[index].title);
    let authorTxt = createTxt("Author", myLibrary[index].author);
    let pagesTxt = createTxt("Pages", myLibrary[index].pages);
    let book = createBookContainer();
    let btnDivContainer = createBtnContainer(myLibrary[index].read);

    book.appendChild(titleTxt);
    book.appendChild(authorTxt);
    book.appendChild(pagesTxt);
    book.appendChild(btnDivContainer);

    /* 
      Data Attribute is used to store the array index location.
      The array index location will be used to locate the book object to remove it
    */
    book.setAttribute("data-array-index", index);
    //Adds the book object to the DOM
    container.appendChild(book);

    index++;
  }

  if (myLibrary.length === 0) {
    resetBooksDisplayed();
  }
}

function resetBooksDisplayed() {
  container.innerHTML = "";
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

function clearArray(array) {
  let counter = myLibrary.length;

  while (myLibrary.length > 0 && counter > 0) {
    myLibrary.pop();
    counter--;
  }
}

function copyArrayToAnotherArray(arrayToCopy, array) {
  for (let i = 0; i < arrayToCopy.length; i++) {
    array[i] = arrayToCopy[i];
  }
}
