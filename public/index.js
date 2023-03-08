const taskDom = document.querySelector(".tasks");
const dueDOM = document.querySelector(".Due")
const booksDOM = document.querySelector(".books")
const loadingDom = document.querySelector(".loading");
const sidebarButton = document.querySelectorAll("li");
const allSections = document.querySelectorAll("section");
const studentCard = document.querySelector('.due-today')
const sideBar = document.querySelector("aside");
const navBar = document.querySelector(".nav-center");
const tableDOM = document.querySelector('.booksTable')
const studentDOM = document.querySelector('.all-students')

//functions 

const localStorage_user = JSON.parse(localStorage.getItem('token'))
const inMemoryToken = localStorage_user.token
const fetchSettings={
  method: 'get',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${inMemoryToken}`

    }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}



//fetching functions

const fetchAllBooks =async()=>{
  const response = await fetch("http://localhost:3000/api/v1/books", fetchSettings);
  const data = await response.json();
  return data;
}

const fetchAllStudents = async()=>{
  const response = await fetch("http://localhost:3000/api/v1/students", fetchSettings);
  const data = await response.json();
  return data;
}
const fetchAllBorrowedBooks = async()=>{
  const response = await fetch("http://localhost:3000/api/v1/borrowed", fetchSettings);
  const data = await response.json();
  return data;
}



const displaySection = (el) => {
  allSections.forEach((item) => {
    item.style.display = "none";

   // navBar.style.backgroundColor = "var(--primary-600)";
   // sideBar.style.backgroundColor = "var(--primary-300)";
   // studentCard.style.backgroundColor = "var(--primary-300)"

    if (item.classList.value === el) {
      item.style.display = "block";
    }

    if (el === "Damaged" || el === "Default") {
      //navBar.style.backgroundColor = "#f70202";
      //sideBar.style.backgroundColor = "#f05b5b";
      //studentCard.style.backgroundColor = "#f05b5b"
    }
  });
};
//displaySection()

//toggle between the sections
sidebarButton.forEach((item) => {
  item.addEventListener("click", () => {
    let myValue = item.innerHTML;
    switch (myValue) {
      case "Due":
        displaySection("Due");
        break;
      case "Borrow":
        displaySection("Borrow");
        break;
      case "Borrowed":
        displaySection("Borrowed");
        break;
      case "Return":
        displaySection("Return");
        break;
      case "Books":
        displaySection("Books");
        break;
      case "Damaged":
        displaySection("Damaged");
        break;
      default:
        displaySection("Default");
    }
  });
});




const showStudents = async()=>{
  try {
    
    
    const Students =await  fetchAllStudents()
    const studentsArray = Students.map(student=>{
      return{
        regNo: student.admissionNumber,
        name: student.name,
        course: student.course,
        yearOfStudy: 2.
      }
    }) 

    generateTable(studentDOM, studentsArray)
    
     
     
   
  } catch (error) {
    console.log(error)
    dueDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
    
  }
}
showStudents()



//fetch all data books
const showAllBooks=async ()=>{
  try {
   const {books} = await fetchAllBooks()
    console.log(books)
    const tableArray = books.map(book=>{
      return{
        _id:book._id.slice(0,5),
        Name:book.title,
        Category:book.category,
        Author:book.author,
        copies:book.copies,
        
      }
    })
   
    generateTable(tableDOM, tableArray); 

    
  } catch (error) {
    console.log(error)
    booksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}

showAllBooks()









