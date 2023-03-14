const bookForm = document.querySelector('.form-book-details')
const bookName = document.querySelector('.book-name-input')
const bookID = document.querySelector('.book-id')
const bookCategory = document.querySelector('.book-category-select')
const bookDescription = document.querySelector('.book-description')
const bookCopies = document.querySelector('.book-copies')
const bookAuthor = document.querySelector('.book-author')


const localStorage_user = JSON.parse(localStorage.getItem('token'))
const inMemoryToken = localStorage_user.token

bookForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
  if(!bookCategory.value || !bookDescription.value || !bookID.value || !bookName.value || !bookCopies.value || !bookAuthor.value){
        alert("please fill all the inputs")
        return;
    } 
  
    const newBook = {
        bookID: bookID.value,
        title: bookName.value,
        category: bookCategory.value,
        description: bookDescription.value,
        copies: bookCopies.value,
        author:bookAuthor.value,

    }
    console.log(newBook)

    const postSettings={
        method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${inMemoryToken}`
      
          },
          body:JSON.stringify(newBook)
      }
      try {
        const response = await fetch('http://localhost:3000/api/v1/books',postSettings)
        const {msg} = await response.json()
     
        if(response.ok){
            alert(msg)
            bookID.value = "";
        bookName.value = "";
        bookCategory.value = "";
        bookDescription.value = "";
        bookCopies.value = "";
        bookAuthor.value = "";
        }else{
            alert(msg)
        } 
      } catch (error) {
        console.log(error)
        alert(error)
      }


  
})