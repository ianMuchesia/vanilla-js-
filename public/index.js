const taskDom = document.querySelector(".tasks");
const dueDOM = document.querySelector(".Due")
const booksDOM = document.querySelector(".books")
const loadingDom = document.querySelector(".loading");
const sidebarButton = document.querySelectorAll("li");
const allSections = document.querySelectorAll("section");
const studentCard = document.querySelector('.due-today')
const sideBar = document.querySelector("aside");
const navBar = document.querySelector(".nav-center");
const tableDOM = document.querySelector('table')






const displaySection = (el) => {
  allSections.forEach((item) => {
    item.style.display = "none";

    navBar.style.backgroundColor = "var(--primary-600)";
    sideBar.style.backgroundColor = "var(--primary-300)";
    studentCard.style.backgroundColor = "var(--primary-300)"

    if (item.classList.value === el) {
      item.style.display = "block";
    }

    if (el === "Damaged" || el === "Default") {
      navBar.style.backgroundColor = "#f70202";
      sideBar.style.backgroundColor = "#f05b5b";
      studentCard.style.backgroundColor = "#f05b5b"
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
    const {data} = await axios.get('/api/v1/students')
    
    const allStudents = data.map(student=>{
      const {admissionNumber, course , name , _id } = student
      return `   <a href="student.html?id=${_id}" class="due-today">
      <div class="student">
        <div class="">
          <h6>Student Name:</h6>
        <h3 class="name">${name}</h3>
        </div>
        
        <h4 class="admNo">
          <span>Reg No: </span>${admissionNumber}</h4>
      </div>
      <div class="program">
        <h4 class="course"><span>Programme: </span> <br/>${course}</h4>
        <h4 class="course"><span>Year of Study: <br/></span> 2</h4>

      </div>

      <div class="book">
        <h3 >
          <span>Title: <br/> </span>
          DATA STRUCTURES AND ALGORITHMS</h3>
          <h3  class="due-date">
            <span >Due Date:<br/> </span>
            30/30/3000</h3>
      </div>
    </a>` 
    }).join('')
    dueDOM.innerHTML = allStudents
  } catch (error) {
    console.log(error)
    dueDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
    
  }
}
showStudents()


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

//fetch all data books
const showAllBooks=async ()=>{
  try {
    const {data:{books}} = await axios.get('/api/v1/books')
    
    let tableArray = books.map(book=>{
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









