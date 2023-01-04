let url = "http://localhost:3000/quizz"
var root = document.getElementById('root')
export default function App(){
    getTodos(renderTodosTodos)
}
const getTodos = (call) => {
    var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    fetch(url + "/" + currentUser.username)
        .then((res) => res.json())  
        .then((call))  
} 
// Render Movies
const renderTodosTodos = (todos) => {
    var count = 0;
    console.log(todos)
    var htmls = todos.map((todo) => {
        count++;
        return `<tr class="todo--row name="${todo.quizzID}" id="${todo.quizzID}">
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
                                <i class="fa-regular fa-pen del--icon" onclick="Delete(e)"></i>
                            </li>
                        </ul>
                    </td>
                </tr>`
    })
    root.innerHTML += htmls.join('')
}
//export default App

//set currentUser
export function setCurrentUser(){
    var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    document.getElementById('currentUser').innerHTML = currentUser.username;
}











