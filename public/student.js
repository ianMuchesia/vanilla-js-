const studentForm = document.querySelector('.form-student-details')
const studentName = document.querySelector('.student-name-input')
const studentCourse = document.querySelector('.student-course')
const studentID = document.querySelector('.student-id')


const localStorage_user = JSON.parse(localStorage.getItem('token'))
const inMemoryToken = localStorage_user.token


studentForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
  if( !studentCourse.value || !studentID.value || !studentName.value){
        alert("please fill all the inputs")
        return;
    } 
   
    const newstudent = {
        admissionNumber: studentID.value,
        name: studentName.value,
        course: studentCourse.value,
       

    }
    const postSettings={
        method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${inMemoryToken}`
      
          },
          body:JSON.stringify(newstudent)
      }
    try {
        const response = await fetch('http://localhost:3000/api/v1/students',postSettings)
        const {msg} = await response.json()
        console.log(msg)
        if(response.ok){
            alert(msg)
            studentCourse.value = "";
        studentName.value = "";
        studentID.value = "";
        }else{
            alert(msg)
        }
       
        
    } catch (error) {
       console.log(error)
       alert(error) 
    }
    


  
})