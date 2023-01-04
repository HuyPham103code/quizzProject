let urlUser = "http://localhost:3000/user"



//handle button login vs Register
//login and signup a account
var btnLogin = document.getElementById('btn--login')
var btnSignup = document.getElementById('btn--signup')
//click on login
function Login(){
    document.querySelector('.login--layout').classList.add('show')
    document.querySelector('.signup--layout').classList.remove('show')
}
//click on signup
function Signup(){
    document.getElementById('login--layout').classList.remove('show')
    document.getElementById('signup--layout').classList.add('show')
}
//register
document.getElementById('register').addEventListener('click',Login)
document.getElementById('login').addEventListener('click',Signup)




//handle resquest to the server
//signup an account
btnSignup.addEventListener('click', () => {
    Signup()
    CheckExit()
})
//login 
btnLogin.addEventListener('click',function(){
    var userName = document.getElementById('email--login').value.trim()
    var password = document.getElementById('password--login').value.trim()
    var link = urlUser + "/" + userName + "/" + password
    CheckPass(link)
    document.getElementById('email--login').value = ""
    document.getElementById('password--login').value = ""
})

const CheckPass = (link) => {
    fetch(link)
        .then((res) => res.json())  
        .then((data) => { //return idUser
            console.log(data) 
            if( data.username == "" ){
                console.log("fail")
                alert("Login failed! please check again!")
                //location.reload()
            }else{
                currentUser = document.getElementById('email--login').value.trim()
                //đưa object user current lên
                window.localStorage.setItem("currentUser",JSON.stringify(data));
                alert("Logged in successfully!")
                location.replace("http://127.0.0.1:5500/UI/index.html")
            }

        })
}

//check if it exists or not
const CheckExit = () => {
    var userName = document.getElementById('email--signup').value.trim()
    fetch(urlUser + "/" + userName)
        .then((res) => res.json())  
        .then((data) => {
            if( data == userName ){
                document.getElementById('email--signup').value = ""
                document.getElementById('password--signup').value = ""
                alert("Account already exists")
            }else{
                CreateUser(userName)
                document.getElementById('email--signup').value = ""
                document.getElementById('password--signup').value = ""
                alert("Signup success")
            }
        }) 
    
}
//create a user
const CreateUser = (userName) =>{
    var password = document.getElementById("email--signup").value.trim()
    var raw = JSON.stringify({
        "username": userName,
        "password": password
    });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46MTIzNDU2");
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(urlUser,requestOptions)
    .then(res => res.json())
    .then((data) => console.log(data))
}