const params = window.location.search;

const id = new URLSearchParams(params).get("id");
const bookDetails = document.querySelector('.book-details')
const localStorage_user = JSON.parse(localStorage.getItem("token"));
const inMemoryToken = localStorage_user.token;
const fetchSettings = {
  method: "get",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${inMemoryToken}`,
  },
};

const showDetails = async () => {
  const response = await fetch(
    `http://localhost:3000/api/v1/books/${id}`,
    fetchSettings
  );
  const {book} = await response.json();

  bookDetails.innerHTML =
  `
  <h1>${book.title}</h1><h3><span>Author: </span>
  Author Me</h3>
  <h3><span>category: </span>
  ${book.category}</h3>
  <p>${book.description}</p>
  <h3>${book.copies? book.copies: "Book Not Available Right Now"}</h3>
  `
  
};

showDetails();
