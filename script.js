window.addEventListener("load", function () {
  listUsers()
  listTodos()
});

const listUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json();

  let tableBody = ``
  users.forEach((user) => {
    tableBody+= `<tr>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.id}</a></td>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.name}</a></td>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.username}</a></td>
    </tr>`
  })
  document.getElementById("tableBody_Users").innerHTML = tableBody
}

const listTodos = async () => {
  var userid = sessionStorage.getItem('userid');
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userid}`)
  const todos = await response.json();

  let tableTodo = ``
  todos.forEach((todo) => {
    tableTodo+= getRow(todo)
  })
  document.getElementById("tableTodos_Todos").innerHTML = tableTodo
  console.log(todos);
}

const postTodos = async () => {
  var title = document.getElementById('title').value
  var userid = sessionStorage.getItem('userid');
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      userId: userid,
      title: title,
      completed: false
      
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const postTodos = await response.json();
  console.log(postTodos);
  addRow(getRow(postTodos))
}

function getRow(todo) {
  return `<tr>
  <td class="centered">${todo.userId}</td>
  <td class="centered">${todo.title}</td>
  <td class="centered"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ${todo.completed == true ? "checked" : ""}></input></td>
  <td class="centered"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ></input></td>
  </tr>`
}

function setId(userid) {
  sessionStorage.setItem('userid', userid)
}

function addRow(row){
  let object = document.getElementById("tableTodos_Todos")
  let content = object.innerHTML
  object.innerHTML = content + row
}