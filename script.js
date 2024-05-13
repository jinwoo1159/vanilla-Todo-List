const todoInput = document.getElementById("todo_input");
const todoUl = document.getElementById("todo_ul");
const addUpdateClick = document.getElementById("AddUpdateClick");

/** todo list를 저장할 빈 배열 */
let toDos = [];

function save() {
  localStorage.setItem("todos", JSON.stringify(toDos));
  // 로컬 스토리지에 toDos 배열을 JSON 문자열 형태로 저장한다.
  // JSON.stringify() 메소드를 사용하면 객체나 배열을 문자열로 변환할 수 있습니다.
  // localStorage 는 문자열 데이터 밖에 저장할 수 없기 때문에,
  // 다른 타입의 데이터를 저장하려고 할 때 문자형으로 변환을 해서 저장해야 합니다.
}

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // 엔터를 눌렀을 경우
    CreateToDo();
    // CreateToDo함수를 실행합니다.
  }
});

function CreateToDo() {
  if (todoInput.value === "") {
    // 입력값이 빈 배열인 경우 아래 코드를 실행합니다.
    alert("Please Enter your todo text!");
  } else {
    // 입력값이 빈 배열인 아닌 경우 아래 코드를 실행합니다.
    const newText = todoInput.value;
    // 입력값을 newText 변수에 할당합니다.
    const todoobj = {
      id: toDos.length + 1,
      // id는 현재 할 일 배열의 길이에 1을 더한 값입니다.
      text: newText,
      // 텍스트는 사용자가 입력한 값입니다.
    };
    paintToDo(todoobj);
    // 사용자가 입력한 값을 화면에 출력합니다.
    toDos.push(todoobj);
    // 사용자가 입력한 값을 toDos 배열에 추가합니다.
    save();
    // 사용자가 입력한 값을 localStorage에 저장하는 함수 호출
    todoInput.value = "";
    // 사용자가 할 일을 입력한 후, 입력 필드를 초기 상태로 돌려놓습니다.
  }
}
addUpdateClick.addEventListener("click", CreateToDo);
// 플러스 모양의 아이콘을 클릭하면 CreateToDo함수가 실행됩니다.

/** todo list를 화면에 출력하는 함수 */
function paintToDo(todoobj) {
  const li = document.createElement("li");
  // <li>요소를 생성하고 li 변수에 할당합니다.
  li.id = todoobj.id;
  // li의 id로 객체 todoobj의 id를 사용합니다.
  const div = document.createElement("div");
  const editimg = document.createElement("img");
  editimg.src = "./imges/pencil.png";
  // editimg 이미지의 경로 지정
  editimg.className = "todo-controls edit";
  const deleimg = document.createElement("img");
  deleimg.src = "./imges/delete.png";
  deleimg.className = "todo-controls delete";
  div.textContent = todoobj.text;
  // div의 텍스트 내용을 객체 todoobj의 text를 사용합니다.
  div.addEventListener("click", CompleteTodoItem);
  // div를 클릭할 경우 CompleteTodoItem함수가 실행됩니다.
  deleimg.addEventListener("click", deleteTodo);
  editimg.addEventListener("click", editToDo);
  li.appendChild(div);
  // li 요소 안에 div를 추가합니다.
  li.appendChild(editimg);
  li.appendChild(deleimg);
  todoUl.appendChild(li);
  // ul의 요소 안에 li를 추가합니다.
}

/** todo list가 제거되는 함수 */
function deleteTodo(event) {
  const re = event.target.parentElement;
  // 이벤트가 발생한 요소의 부모 요소를 re변수에 할당합니다.
  toDos = toDos.filter((todo) => todo.id !== parseInt(re.id));
  // toDos 배열에서 클릭된 요소의 id와 일치하지 않는 요소들만 필터링하여 toDos를 업데이트합니다.
  // toDos 배열에서 re.id에 해당하는 아이디를 가진 항목을 제외한 나머지 항목들로 이루어진 새로운 배열을 만들고, 그 배열을 다시 toDos에 할당합니다.
  re.remove();
  // 부모 요소를 제거합니다.
  save();
  // 업데이트된 toDos를 localStorage에 저장하는 setTodo 함수를 호출
}

// todo 완료 표시 유무
function CompleteTodoItem(e) {
  if (e.target.style.textDecoration !== "line-through") {
    // 클릭된 항목의 텍스트에 취소 줄이 그어져 있지 않다면
    e.target.style.textDecoration = "line-through";
    // 취소 줄을 그어 해당 항목이 완료되었음을 표시하고
    e.target.style.color = "gray";
    // 텍스트 색을 회색으로 변경합니다.
  } else {
    e.target.style.textDecoration = "none";
    // 만약 해당 항목의 텍스트에 취소 줄이 그어져 있다면
    // 취소 줄을 제거하여 완료 상태를 취소하고
    e.target.style.color = "black";
    // 텍스트 색을 검정색으로 변경합니다.
  }
}

/** todo list를 수정하는 함수 */
// function editToDo(event) {
//   const li = event.target.parentElement;
//   const div = li.querySelector("div");
//   const input = document.createElement("input");
//   input.value = div.textContent;

//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//       const newTodo = e.target.value;
//       div.textContent = newTodo;
//       toDos = toDos.map((todo) => {
//         if (todo.id === parseInt(li.id)) {
//           return { id: todo.id, text: newTodo };
//         } else {
//           return todo;
//         }
//       });
//       save();
//       li.replaceChild(div, input);
//     }
//   });

//   li.replaceChild(input, div);
// }

// function editToDo(event) {
//   const li = event.target.parentElement;
//   const div = li.querySelector("div");
//   const input = li.querySelector("input");

//   if (div) {
//     const newInput = document.createElement("input");
//     newInput.type = "text";
//     newInput.value = div.textContent;
//     newInput.addEventListener("change", (e) => {
//       const newTodo = e.target.value;
//       div.textContent = newTodo;
//       toDos = toDos.map((todo) =>
//         todo.id === parseInt(li.id) ? { text: newTodo, id: todo.id } : todo
//       );
//       save();
//     });
//     li.replaceChild(newInput, div);
//   } else if (input) {
//     const newDiv = document.createElement("div");
//     newDiv.textContent = input.value;
//     newDiv.addEventListener("click", CompleteTodoItem);
//     li.replaceChild(newDiv, input);
//   }
// }

// todolist를 수정하는 함수
function editToDo(event) {
  // 클릭한 요소의 부모 요소인 li를 찾습니다.
  const li = event.target.parentElement;
  // li 요소 내의 div 요소를 찾습니다.
  const div = li.querySelector("div");
  // li 요소 내의 input 요소를 찾습니다.
  const input = li.querySelector("input");
  // div 요소가 있을 경우 (편집 모드가 아닐 경우)
  if (div) {
    // 새 input 요소를 생성합니다.
    const newInput = document.createElement("input");
    // input 요소의 타입을 "text"로 설정합니다.
    newInput.type = "text";
    // input 요소의 값을 div 요소의 텍스트로 설정합니다.
    newInput.value = div.textContent;
    // input 요소에 'change' 이벤트 리스너를 추가합니다.
    newInput.addEventListener("change", (e) => {
      // 'change' 이벤트 발생 시 (input 값이 변경될 때), 새로운 할 일 텍스트를 가져옵니다.
      const newTodo = e.target.value;
      // div 요소의 텍스트를 새로운 할 일 텍스트로 변경합니다.
      div.textContent = newTodo;
      // toDos 배열에서 해당 할 일을 찾아 텍스트를 업데이트합니다.
      toDos = toDos.map((todo) =>
        todo.id === parseInt(li.id) ? { text: newTodo, id: todo.id } : todo
      );
      // 변경된 toDos 배열을 로컬 스토리지에 저장합니다.
      save();
    });
    // li 요소에서 div 요소를 제거하고, 새로 생성한 input 요소로 대체합니다.
    li.replaceChild(newInput, div);
  }
  // input 요소가 있을 경우 (편집 모드일 경우)
  else if (input) {
    // 새 div 요소를 생성합니다.
    const newDiv = document.createElement("div");
    // div 요소의 텍스트를 input 요소의 값으로 설정합니다.
    newDiv.textContent = input.value;
    // div 요소에 'click' 이벤트 리스너를 추가합니다.
    newDiv.addEventListener("click", CompleteTodoItem);
    // li 요소에서 input 요소를 제거하고, 새로 생성한 div 요소로 대체합니다.
    li.replaceChild(newDiv, input);
  }
}

function gettodo() {
  const loadedTodo = localStorage.getItem("todos");
  // localStorage.getItem("todos")를 loadedTodo변수에 할당
  if (loadedTodo !== null) {
    // localStorage에 "todos"라는 키로 저장된 값이 있다면
    const parseTodo = JSON.parse(loadedTodo);
    // localStorage에서 가져온 값을 JSON 형식으로 변환합니다.
    toDos = parseTodo;
    // 변환된 값을 전역변수인 toDos에 할당합니다.
    parseTodo.forEach(paintToDo);
    // 변환된 각 todo에 대해 paintToDo 함수를 실행해 화면에 그립니다.
    save();
    // 변환된 todo 목록을 localStorage에 다시 저장합니다.
  }
}

gettodo();
// 'gettodo' 함수를 호출하여 실행합니다.
