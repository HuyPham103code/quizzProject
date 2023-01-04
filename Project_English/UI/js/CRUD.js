
let URL = "http://localhost:3000/quizz"
var root = document.getElementById('root')
var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
export default function show(){
    console.log("show")
    document.querySelector('.input').classList.remove('show')
}
export  function notShow(){
    console.log("not show")
    document.querySelector('.input').classList.add('show')
   postData()
}

function postData(){
    var english = document.getElementById('input--english').value.trim()
    var mean = document.getElementById('input--mean').value.trim()
    var choose
    var checkbox = document.getElementById('input--choose')
    if( checkbox.checked == true){
        choose = true
    }else{
        choose = false
    }
    var raw = JSON.stringify({
        "english": english,
        "mean": mean,
        "choose": choose,
        "userid": currentUser.username
    });
    console.log(raw)
    //post a new todo
    Post(raw,insertDOM)
    //reset input tag
    document.getElementById('input--english').value = ""
    document.getElementById('input--mean').value = ""
}

const Post = (data,callback) => {
    console.log("userid: " + currentUser.username)
    console.log(data)
    //define headers
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46MTIzNDU2");
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };
    fetch(URL,requestOptions)
    .then(res => res.json())
    .then(callback)
} 

const insertDOM = (todo) => {
    var arr = document.querySelectorAll('tr')
    var count = arr.length
    root.innerHTML += `<tr class="todo--row name="${todo.quizzID}" id="${todo.quizzID}">
                            <td class="todo--id">${count}</td>
                            <td class="todo--english">${todo.english}</td>
                            <td class="todo--mean">${todo.mean}</td>
                            <td class="todo--complete">
                                <ul class="todo--func" id="${count}">
                                    <li class="todo--func--value">${todo.choose}</li>
                                    <li class="todo--func--fix">
                                        <i class="fa-sharp fa-solid fa-pen fix--icon" onclick="Update(event)"></i>
                                    </li>
                                    <li class="todo--func--del ">
                                        <i class="fa-regular fa-pen del--icon" onclick="Delete(event)"></i>
                                    </li>
                                </ul>
                            </td>
                        </tr>`
    console.log(todo)
}
//delete todo
// export function Delete(e){
//     var id = e.target.parentElement.parentElement.parentElement.parentElement.id.trim()
//    fetch(URL + "/" + id,{
//     method: 'DELETE',
//    })
//    .then( res => res.json)
//    .then( res => console.log(res))

//    location.reload();
// }

// //handle update
// //show layout update
// const showUpdate = () => {
//     document.getElementById('showUpdate').classList.remove('show-Update');
//     document.getElementById('input--name').focus
// }
// //close layout update
// const notShowUpdate = () => {
//     document.getElementById('showUpdate').classList.add('show-Update');
// }

// const Update = (e) => {
//     showUpdate()
//     var btnUpdate = document.getElementById('btn--update')
//     btnUpdate.addEventListener('click',() =>{
//         notShowUpdate()
//         updateTodo(e)
//     })
// }


// const updateTodo = (e) =>{
//     var name2 = document.getElementById('input--name2').value.trim()
//     var done2
//     var checkbox2 = document.getElementById('input--done2')
//     if( checkbox2.checked == true){
//         done2 = true
//     }else{
//         done2 = false
//     }
//     console.log("|" + name2 + "|")
//     var raw2 = JSON.stringify({
//         "content": name2,
//         "done": done2
//     });
//     console.log(raw2)
//     putMethod(raw2, e)
// }
// const putMethod = (data, e) => {
//     var id = e.target.parentElement.parentElement.parentElement.parentElement.id.trim()
//     var index = e.target.parentElement.parentElement.id.trim()
//     console.log(index)
//     fetch(URL+ "/" + id, {
//         method: 'PUT', // Method itself
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
//         },
//         body: data // We send data in JSON format
//     })
//     .then( res => res.json())
//     .then(data => {
//         var resetData = e.target.parentElement.parentElement.parentElement.parentElement
//         resetData.innerHTML = `<tr class="todo--row name="${data.todoID}" id="${data.todoID}">
//                                     <td class="todo--id">${index}</td>
//                                     <td class="todo--name">${data.content}</td>
//                                     <td class="todo--complete">
//                                         <ul class="todo--func" id=${index}>
//                                             <li class="todo--func--value">${data.done}</li>
//                                             <li class="todo--func--fix">
//                                                 <i class="fa-sharp fa-solid fa-pen fix--icon" onclick="Update(event)"></i>
//                                             </li>
//                                             <li class="todo--func--del ">
//                                                 <i class="fa-regular fa-pen del--icon" onclick="Delete(event)"></i>
//                                             </li>
//                                         </ul>
//                                     </td>
//                                 </tr>`
//     })


// }