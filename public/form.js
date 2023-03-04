
//borrow form
const borrowForm = document.querySelector('.form-borrow')
const studentNameInput = document.querySelector('.student-name-input')
const StudentAdmNoInput = document.querySelector('.student-adm-no')
const course = document.querySelector('#course')
const categorySelect = document.querySelector('.category-select')
const bookName = document.querySelector('.book-name')
const boookId = document.querySelector('.book-id')


borrowForm.addEventListener('submit', (e)=>{
    e.preventDefault()
     const studentName = studentNameInput.value
    const studentAdmNo = StudentAdmNoInput.value
    const courseId = course.value
    const categoryId = categorySelect.value
    const book_Name = bookName.value
    const book_Id = boookId.value

    const myValue={
        studentName,
        studentAdmNo,
        courseId,
        categoryId,
        book_Name,
        book_Id
    }
    console.log(myValue) 
})


//return form
const formReturn = document.querySelector('.form-return')

const StudentAdmNoInputReturn = document.querySelector('.student-adm-no-return')
const bookIDReturnForm = document.querySelector('.book-id-return')
const bookNameReturnForm = document.querySelector('.book-name-return')
const isDamaged = document.getElementsByName("is-damaged");
const comment = document.querySelector('#comment')



    console.log(isDamaged)

    
 formReturn.addEventListener('submit',(e)=>{
    e.preventDefault()
   
    const studentAdmNo = StudentAdmNoInputReturn.value
    const bookID = bookIDReturnForm.value
    const book_Name = bookNameReturnForm.value
    const commentValue = comment.value
    let value;
    for (const radio of isDamaged) {
      if (radio.checked) {
        value = radio.value;
        break;
      }
    }
    console.log(value);
    const myValue = {

        studentAdmNo,
        bookID,
        book_Name,
        commentValue,
        value,
    }

     console.log(myValue)
}) 