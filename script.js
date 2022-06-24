const nodeTableTodos = document.getElementById("tableTodos_Todos");
const nodeTableUsers = document.getElementById("tableBody_Users");

window.addEventListener("load", function () {
  nodeTableUsers != null ? listUsers() :
    listTodos()
});

const getUsers = new Promise((res, rej) => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(users => res(users.json()))
    .catch(e => rej("Ocorreu um erro ao buscar os usuários"))
})

const getUserData = async id => await new Promise((res, rej) => {
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
    .then(user => res(user.json()))
    .catch(e => rej("Ocorreu um erro ao buscar os usuários"))
})

const listUsers = () => getUsers
  .then(data => data.map(user => appendInnerHtml(getRowUser(user), nodeTableUsers)))
  .catch(() => alert("Ocorreu um erro ao buscar os usuários!"))

const listTodos = async () => {
  var userId = sessionStorage.getItem('userid');
  getUserData(userId)
    .then(data => data.map(userData => appendInnerHtml(getRowTodo(userData), nodeTableTodos)))
    .catch(() => console.log("Não foi possível buscar os dados desse usuário :("))
}

const createTodo = async data => await new Promise((res, rej) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      userId: data.userid || 999,
      title: data.title,
      completed: false
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(todo => res(todo.json()))
    .catch(() => alert("Não foi possível criar um novo TODO :("))
})

const handleNewTodo = async () => {
  createTodo({
    title: document.getElementById('title').value || "Untitled",
    userid: sessionStorage.getItem('userid')
  })
    .then(todo => appendInnerHtml(getRowTodo(todo), nodeTableTodos))
    .catch(() => alert("Não foi possivel inserir o novo TODO :("))
}

function getRowUser(user) {
  return `<tr>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.id}</a></td>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.name}</a></td>
    <td class="centered" onclick="setId(${user.id})"><a href="./todoList.html">${user.username}</a></td>
    </tr>`
}

function getRowTodo(todo) {
  return `<tr>
  <td class="centered">${todo.userId}</td>
  <td class="centered">${todo.title}</td>
  <td class="centered"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ${todo.completed == true ? "checked" : ""}></input></td>
  <td class="centered"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" ></input></td>
  </tr>`
}

const setId = id => sessionStorage.setItem('userid', id)

const appendInnerHtml = (content, obj, order) => {
  const oldData = obj.innerHTML;
  order === 0 ? obj.innerHTML = content + oldData : obj.innerHTML = oldData + content
}