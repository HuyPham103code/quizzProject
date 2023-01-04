import showUser from "./showUser.js"
import show, {notShow} from "./CRUD.js"
import App, {setCurrentUser} from "./render_data.js"

var create = document.getElementById('create')
//change login
document.getElementById('logout1').addEventListener('click', function(){
    location.replace("http://127.0.0.1:5500/UI/login.html")
})
document.getElementById('logout2').addEventListener('click', function(){
    location.replace("http://127.0.0.1:5500/UI/login.html")
})


/* show Icon user */
document.getElementById('currentUser').addEventListener('click', showUser)


//show layout create new quizz
//show
create.addEventListener('click', function() {
    console.log("zo1")
    show()
})
//close layout create
document.getElementById('input--add').addEventListener('click', notShow)

//render data after login
App()
setCurrentUser()

//CRUD
//post method
//document.getElementById('input--add').addEventListener('click',postData)
 const Delete = (e) => {
    var id = e.target.parentElement.parentElement.parentElement.parentElement.id.trim()
   fetch(URL + "/" + id,{
    method: 'DELETE',
   })
   .then( res => res.json)
   .then( res => console.log(res))

   location.reload();
}
