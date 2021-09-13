const $sidebarToggle = document.getElementById("sidebar-toggle");
const smallScreen = window.matchMedia("(min-width: 768px");
if (smallScreen.matches) {
  document.getElementById("sidebar").classList.add("sidebar-nav-full");
}
if ($sidebarToggle) {
  $sidebarToggle.addEventListener("click", (e) => {
    document.getElementById("sidebar").classList.toggle("hide");
    document.getElementById("body").classList.toggle("margin-left-none");
    document.getElementById("sidebar").classList.remove("sidebar-nav-full");
  });
}

const $tableBody = document.getElementById("table-body");
const todos = getLocalStorageTodo();

// List Todo
todos.forEach((todo, index) => {
  const tr = document.createElement("tr");
  const classStatus =
    todo.status === "Pending" ? "btn-outline-success" : "btn-success";
  tr.innerHTML = `<th scope="row">${index + 1}</th>
    <td><a href='detail.html?id=${todo.id}'>${todo.title}</a></td> 
    <td><button class='btn ${classStatus} status' data-index='${todo.id}'>${
    todo.status
  }</button></td> 
    <td class='text-right'><a href='edit.html?id=${
      todo.id
    }' class='btn btn-warning'>Edit</a></td> 
    <td class='text-right'><button class='btn btn-danger delete' data-index='${
      todo.id
    }'>Delete</button></td>`;
  $tableBody && $tableBody.appendChild(tr);
});

// Search
const $search = document.querySelector('input[type="search"]');
$search.addEventListener("keyup", () => {
  let input, filter, tr, a, i, txtValue;
  input = $search;
  filter = input.value.toUpperCase();

  if ($tableBody) {
    tr = $tableBody.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      a = tr[i].getElementsByTagName("a")[0];
      console.log(a);
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});

// Delete
const $deleteBtn = document.querySelectorAll(".delete");
$deleteBtn.forEach((del) => {
  del.addEventListener("click", (e) => {
    const itemId = e.target.dataset.index;
    removeLocalStorageTodo(itemId);
    const item = e.target.parentNode.parentNode;
    item.remove();
  });
});

// Status
const $statusBtn = document.querySelectorAll(".status");
$statusBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const itemId = e.target.dataset.index;
    const status = toggleTodoStatus(itemId);
    console.log(status);
    if (btn.classList.contains("btn-outline-success")) {
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-success");
    } else {
      btn.classList.remove("btn-success");
      btn.classList.add("btn-outline-success");
    }
    btn.innerText = status;
  });
});

// Edit Todo
const $formEdit = document.getElementById("edit-form");
const $titleEdit = document.getElementById("title-edit");
const $descriptionEdit = document.getElementById("description-edit");

if ($formEdit) {
  const currentItem = getCurrentItem();
  $titleEdit.value = currentItem.title;
  $descriptionEdit.value = currentItem.description;

  $formEdit.onsubmit = (e) => {
    e.preventDefault();
    currentItem.title = e.target.title.value;
    currentItem.description = e.target.description.value;

    setLocalStorageTodo();
    window.location.href = "/";
  };
}

// Add Todo
const $formCreate = document.getElementById("create-form");
if ($formCreate) {
  $formCreate.onsubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    if (title && description) {
      addTodoList(title, description) && $formCreate.reset();
    } else alert("Create Todo Faild!");
  };
}

// Detail
const $titleDetail = document.getElementById("title-detail");
const $descriptionDetail = document.getElementById("description-detail");
const currentItem = getCurrentItem();
if (currentItem) {
  $titleDetail.innerHTML = currentItem.title;
  $descriptionDetail.innerHTML = currentItem.description;
}

// all function
function addTodoList(title, description) {
  todos.push({
    id: todos.length + 1,
    title: title,
    status: "Pending",
    description: description,
  });
  setLocalStorageTodo();
  return true;
}

function getLocalStorageTodo() {
  return localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
}
function removeLocalStorageTodo(id) {
  const index = todos.findIndex((element) => element.id === parseInt(id));
  if (index !== -1) todos.splice(index, 1);
  setLocalStorageTodo();
  // remove cart item in localStorage
  if (todos.length === 0) {
    localStorage.removeItem("todo");
  }
}

function setLocalStorageTodo() {
  return localStorage.setItem("todo", JSON.stringify(todos));
}

function getCurrentItem() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  return todos.find((element) => element.id === id);
}

function toggleTodoStatus(id) {
  const index = todos.findIndex((element) => element.id === parseInt(id));
  todos[index].status = todos[index].status === "Pending" ? "Done" : "Pending";

  setLocalStorageTodo();

  return todos[index].status;
}
