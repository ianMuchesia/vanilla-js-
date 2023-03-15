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


const deleteSettings = {
  method: "delete",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${inMemoryToken}`,
  },
};

const showDetails = async () => {
 
  try {
    const response = await fetch(
        `http://localhost:3000/api/v1/borrowed/${id}`,
        fetchSettings
      );

      const data = await response.json();
    
     
    const {book , damagedReason , returnDate , student} = data
      bookDetails.innerHTML =
      `
      <h4>Book ID : ${book.bookID}</h4>
      <h1 class="book-title">${book.title}</h1><h3><span>Student Name: </span>
      ${student.name}</h3>
       <h4>Reg No : ${student.admissionNumber}</h4>
      <h3><span>category: </span>
      ${book.category}</h3>
      <p>description of the damage: <br/> ${damagedReason}</p>
     
      `
  } catch (error) {
    console.log(error)
    alert("error")
    location.replace("Home.html")
  }
};

showDetails();

//delete damaged book
const deleteButton = document.querySelector('.delete-btn')
console.log(deleteButton)


deleteButton.addEventListener("click",async()=>{
  console.log(id)
  try {
   /*  const response = await fetch(
      `http://localhost:3000/api/v1/borrowed/${id}`,
      deleteSettings
    );

    const {msg} = await response.json();
    */
    location.replace("Home.html")
/*    if(response.Ok){
    alert(msg)
    location.replace("Home.html")
   } else{
    alert(msg)
   } */
  } catch (error) {
    alert(error)
    console.log(error)
  }
})