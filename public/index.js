const taskDom = document.querySelector(".tasks");
const dueDOM = document.querySelector(".Due")
const booksDOM = document.querySelector(".books")
const loadingDom = document.querySelector(".loading");
const sidebarButton = document.querySelectorAll("li");
const allSections = document.querySelectorAll("section");
const studentCard = document.querySelector('.due-section')
const sideBar = document.querySelector("aside");
const navBar = document.querySelector(".nav-center");
const tableDOM = document.querySelector('.booksTable')
const studentDOM = document.querySelector('.all-students')
const borrowedContainer = document.querySelector('.borrowed-container')
const booksSection = document.querySelector('.Book')
const BorrowedSection = document.querySelector('.Borrowed')
const DamagedSection = document.querySelector('.Damaged')
const DefaultSection = document.querySelector('.Default')

const Loader = ` <div class="loader">
<div class="square" id="sq1"></div>
<div class="square" id="sq2"></div>
<div class="square" id="sq3"></div>
<div class="square" id="sq4"></div>
<div class="square" id="sq5"></div>
<div class="square" id="sq6"></div>
<div class="square" id="sq7"></div>
<div class="square" id="sq8"></div>
<div class="square" id="sq9"></div>
</div>`
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
     
      case "Home":
        displaySection("Home");
        break;
      case "Students":
          displaySection("Students")
          break;
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

const showAllBorrowed=async()=>{
  try {
    studentCard.innerHTML = Loader
    borrowedContainer.innerHTML = Loader
    const data = await fetchAllBorrowedBooks()
   
    const allBorowedBooks = data.map(item=>{
      const {student, returnDate , book} = item
      return `
      <div class="due-card">
      <div class="student-section-due">
        <h5><span>Student Name:   <br/></span>${student.name}</h5>
        <h6>Course: <span class="adm-no-due">${student.course}</span></h6>
      </div>
      <div class="book-section-due">
        <h5><span>Book Title:   <br/></span>${book.title}</h5>
      
        <h5><span>Return Date:   </span>${(new Date(returnDate)).toISOString().slice(0, 10)}</h5>
      </div>
    </div>
      `
    }).join("")
    studentCard.innerHTML = allBorowedBooks




    const allBorrowedContainer = data.map(item=>{
      const {student, returnDate , book} = item
      return `
      <div class="borrowed-card">
                  
      <div class="book-borrowed">
        <h4 class="book-borrowed-name">${book.title}</h4>
        <h4 class="book-isbn">${book._id.slice(1,8)}</h4>
      </div>
      <div class="book-borrowed-return">
        <span class="">Due Date: </span>
        <h2 class="borrowed date">${(new Date(returnDate)).toISOString().slice(0, 10)}</h2>
      </div>

      <div class="book">
        <h6 class="book">Borrowed By:</h6>
        <h3>${student.name}</h3>
      </div>
      <a href="BookDetails.html?id=${book._id}">Book Details</a>
    </div>
      `
    }).join("")
    borrowedContainer.innerHTML =allBorrowedContainer


   

  } catch (error) {
    console.log(error)
    studentCard.innerHTML =
    '<h5 class="empty-list">There was an error, please try later....</h5>'
    borrowedContainer.innerHTML =  '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}
showAllBorrowed()





//borrow form
const borrowForm = document.querySelector('.form-borrow')
const studentNameInput = document.querySelector('.student-name-borrow')
const StudentAdmNoInput = document.querySelector('.student-adm-borrow')
const course = document.querySelector('.course-borrow')
const categorySelect = document.querySelector('.category-select-borrow')
const bookName = document.querySelector('.book-name-borrow')
const boookId = document.querySelector('.book-id-borrow')


borrowForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
   
    if(!studentNameInput.value || !StudentAdmNoInput.value|| !course.value|| !categorySelect.value || !bookName.value || !boookId.value){
      alert("please fill all the inputs")
        return;

    }

    const myValue={
        studentName:studentNameInput.value,
        studentAdmNo:StudentAdmNoInput.value,
        courseId:course.value,
        categoryId:categorySelect.value ,
        book_Name: bookName.value,
        book_Id: boookId.value,
    }
    console.log(myValue) 
    const postSettings={
      method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${inMemoryToken}`
    
        },
        body:JSON.stringify(myValue)

    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/borrowed',postSettings)
        const {msg} = await response.json()

        if(response.ok){
          alert(msg)
          studentNameInput.value= "";
          StudentAdmNoInput.value= "";
          course.value = "";
          categorySelect.value = "";
          bookName.value = "";
          boookId.value= "";
      }else{
          alert(msg)
      } 
    } catch (error) {
      console.log(error)
      alert(error)
    }
})


//return form
const formReturn = document.querySelector('.form-return')

const StudentAdmNoInputReturn = document.querySelector('.student-adm-no-return')
const bookIDReturnForm = document.querySelector('.book-id-return')
const bookNameReturnForm = document.querySelector('.book-name-return')
const isDamaged = document.getElementsByName("is-damaged");
const comment = document.querySelector('#comment')




    
 formReturn.addEventListener('submit',async(e)=>{
    e.preventDefault()
   
   
    let value;
    for (const radio of isDamaged) {
      if (radio.checked) {
        value = radio.value;
        break;
      }
    }
    console.log(value);
    if( !StudentAdmNoInputReturn.value|| !bookIDReturnForm.value || !bookNameReturnForm.value){
      alert("please fill all inputs")
      return;
    }
    if(value ==="Yes" && !comment.value){
      alert("Include the damaged description")
      return;
    }
    const myValue = {

      admissionNumber:StudentAdmNoInputReturn.value,
      bookID:bookIDReturnForm.value,
      book_name:bookNameReturnForm.value,
      damagedReason:comment.value,
      damaged:value
    }

     
     const postSettings={
      method: 'post',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${inMemoryToken}`
    
        },
        body:JSON.stringify(myValue)

    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/return',postSettings )
      const data =await response.json()
      console.log(data)
      if(response.ok){
        alert(data.msg)
      }else{
        alert(data.msg)
      }
    } catch (error) {
      console.log(error)
    }

}) 


//Delete Borrowed


//get damaged Books
const damagedContainer = document.querySelector('.damaged-container') 
const showDamagedBooks = async()=>{


  try {
    damagedContainer.innerHTML = Loader
    const response = await fetch('http://localhost:3000/api/v1/damaged', fetchSettings)
    const data = await response.json()
    
    const allDamagedBooks = data.map(item=>{
      const {book , student , borrowDate , damagedReason , _id } = item
      return `
      <div class="damaged-card">
      <div class="damaged-student">
        <h5 class="damaged-name"><span>Student Name: <br/></span>${student.name}</h5>
        <h5 class="damaged-admNo"><span>Student Name: <br/></span>${student.admissionNumber}</h5>
      </div>
      <div class="damaged-student book-damaged-container">
        <h5 class="damagedBookName"><span>Book Name: <br/></span>${book.title}</h5>
        <h5 class="damagedBookID"><span>Book Id: <br/></span>${book.bookID}</h5>
      </div>

      <div class="damaged-student reason-container">
        <h5 class="damaged-reason">${damagedReason}</h5>
        <!--<span>Remove</span>
        <i class="bi bi-trash3 delete-damaged-button" data-id=${_id}></i>-->
      </div>
    </div>
      `
    }).join("")
    
    damagedContainer.innerHTML = allDamagedBooks
  } catch (error) {
    console.log(error)
    damagedContainer.innerHTML ='<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}

showDamagedBooks()




//show defaulted Books
const defaultedContainer = document.querySelector('.defaulted-container') 
const showDefaultedBooks = async()=>{


  try {
    defaultedContainer.innerHTML = Loader
    const response = await fetch('http://localhost:3000/api/v1/defaulted', fetchSettings)
    const data = await response.json()
    
    const allDefaultedBooks = data.map(item=>{
      const {book , student} = item
      return `
      <div class="defaulted-card">
      <div class="student">
        <h5 class="name"><span>Student Name: <br/></span> ${student.name}</h5>
        <h5 class="admNo"><span>Reg No: <br/></span>${student.admissionNumber}</h5>
      </div>
      <div class="program">
        <h5 class="course"><span>Course: <br/></span>${student.course}</h5>
      </div>

      <div class="book">
        <h5 class="book"><span>Book Name: <br/></span>${book.title}</h5>
        <h5 class="book"><span>Book Id: <br/></span>${book.bookID}</h5>
        <h5 class="remove"><span>Remove<br/></span><i class="bi bi-trash3" data_id=${_id}></i></h5>
      </div>
    </div>
      `
    })
    if(allDefaultedBooks.length<1){
      defaultedContainer.innerHTML = '<h5 class="empty-list">No Defaulted Books</h5>'
    }else{
      defaultedContainer.innerHTML = allDefaultedBooks.join("")
    }
  } catch (error) {
    console.log(error)
  defaultedContainer.innerHTML ='<h5 class="empty-list">There was an error, please try later....</h5>' 
  }
}

showDefaultedBooks()



//Log Out

const logOut = document.querySelector('.logOut')


logOut.addEventListener('click', ()=>{
  localStorage.removeItem("token")
  location.replace("index.html")

})


/* 
const deleteBtn = document.querySelectorAll('i')
console.log(deleteBtn) */





/*   deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async () => {
      const id = deleteButton.dataset.id;
      console.log(" iam here")
       try {
        const response = await fetch(`http://localhost:3000/api/v1/borrowed/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain, *//*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${inMemoryToken}`
        }});
        const {msg} = response.json()
        if (response.ok) {
          showDamagedBooks()
          alert(msg)
        } else {
         alert(msg)
        }
      } catch (error) {
        console.log(error);
      } 
    });
  }); */