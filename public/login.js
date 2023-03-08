const email = document.querySelector('#logemail')
const password = document.querySelector('#logpass')
const form = document.querySelector('form')
const warningText = document.querySelector('btn-link')



form.addEventListener('submit', async(e) => {
    e.preventDefault()
   if(!email || !password) {
     warningText.innerHTML = "please fill all the fields"
     return;
   }
   try {
    const response = await fetch('http://localhost:3000/api/v1/auth/login',{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    const data = await response.json()
   
    localStorage.setItem("token",JSON.stringify(data))
    if(response.ok){
        location.replace("Home.html")
    }else{
        alert('Something Wrong happened try again later')
    }
 
   } catch (error) {
    console.log(error)
   }
})