![[첫 프로젝트.gif]]
# 목적
- 지금까지 배운 내용을 잊지 않기 위해, JavaScript를 이용하여 Todo-List를 만들어 보려고 합니다.
- git을 직접 사용하면서 익숙하게 사용하고 싶습니다.
- 클론 코딩처럼 강사님의 코드를 따라서 진행하면 완성할 수 있지만, 제 목표는 프로젝트를 진행하는 도중 에러를 만나서 직접 해결하고, 새로운 기능을 추가하고, 모르는 것이 있다면 공부하거나 구글에서 검색하여 문제를 해결하고 싶어서 진행하게 되었습니다.
# 구현 내용
- 생성
- 삭제
- 수정 - prompt가 아닌 인풋을 생성해서 수정할 수 있어야 합니다.
- 완료 표시를 할 수 있어야 합니다.
- localStorage를 사용해서 브라우저가 다시 열려도 저장된 투두리스트가 보일것
## 기본 HTML, CSS 구조
## HTML
```html
<div class="container">
  <div class="todo_header">
    <h2>ToDo List</h2>
    <img src="./imges/notebook.gif" height="50px" />
  </div>

  <div class="todo_body">
    <input type="text" id="todo_input" placeholder="Add your task" />
    <img src="./imges/plus.png" id="AddUpdateClick" />
  </div>
  <ul id="todo_ul"></ul>
</div>
```
## CSS
```css
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
}

body {
  background-color: #78c1f3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background-color: #fff;
  padding: 25px;
  width: 500px;
  border-radius: 10px;
}

.todo_header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo_body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #edeef0;
  border-radius: 30px;
  padding-left: 20px;
  margin-bottom: 20px;
}

.todo_body input {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 15px 0;
  font-size: 20px;
}

.todo_body img {
  cursor: pointer;
  height: 55px;
  width: 55px;
  padding: 15px;
  background-color: limegreen;
  border-radius: 40px;
}

ul li {
  list-style: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #edeef0;
  margin-bottom: 10px;
  border-radius: 5px;
}

li div {
  flex-grow: 1;
}

.todo-controls {
  width: 25px;
  height: 25px;
  padding: 3px;
  margin-right: 5px;
}

#todo_ul li input {
  background-color: #edeef0;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  outline: none;
}
```
## JS 전체 코드
```jsx
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

```
## 기능 구현 - 생성 부분
```jsx
function CreateToDo() {
  if (todoInput.value === "") {
    alert("Please Enter your todo text!");
  } else {
    const newText = todoInput.value;
    const todoobj = {
      id: toDos.length + 1,
      text: newText,
    };
    paintToDo(todoobj);
    toDos.push(todoobj);
    save();
    todoInput.value = "";
  }
}

addUpdateClick.addEventListener("click", CreateToDo);

function paintToDo(todoobj) {
  const li = document.createElement("li");
  li.id = todoobj.id;
  const div = document.createElement("div");
  const editimg = document.createElement("img");
  editimg.src = "./imges/pencil.png";
  editimg.className = "todo-controls edit";
  const deleimg = document.createElement("img");
  deleimg.src = "./imges/delete.png";
  deleimg.className = "todo-controls delete";
  div.textContent = todoobj.text;
  div.addEventListener("click", CompleteTodoItem);
  deleimg.addEventListener("click", deleteTodo);
  editimg.addEventListener("click", editToDo);
  li.appendChild(div);
  li.appendChild(editimg);
  li.appendChild(deleimg);
  todoUl.appendChild(li);
}
```
- 일단 `CreateToDo()`를 보면 인풋창에 내용을 작성하지 않은 경우 알림창이 나오게 했습니다. 그리고 내용을 작성했다면 아래코드가 진행됩니다. 입력값을 `newText`에 할당, `todoobj`는 `id`와 `text`라는 `key`를 가지는 객체입니다. 이 키와 값 구조는 로컬 스토리지에 데이터를 저장하기 위해 사용되기 때문에 객체로 구성해서 저장합니다.  그리고 `paintToDo()`에서 사용자가 입력한 값을 화면에 출력합니다. 그리고 `toDos`라는 빈 배열에 `todoobj`를 추가하고, `save()`에서 사용자가 입력한 값을 localStorage에 저장합니다. 그리고 입력창에 입력한 뒤에 초기화 합니다.
## 기능 구현 - 삭제 부분
```jsx
function deleteTodo(event) {
  const re = event.target.parentElement;
  toDos = toDos.filter((todo) => todo.id !== parseInt(re.id));
  re.remove();
  save();
}
```
- `paintToDo()`함수 안에 휴지통 이미지에 대한 `deleimg.addEventListener("click", deleteTodo)`를 생성, 휴지통을 클릭하면 `deleteTodo()`가 실행, 클릭된 요소의 부모 요소를 re 변수에 할당 `toDos`에 필터를 실행 `toDos` 배열에서 `re.id`와 일치하지 않는 요소들만을 선택하여 새로운 배열을 만들고 `toDos`에 할당합니다. 즉, `re.id`에 일치하는 아이디를 가진 항목은 제외되고 그 외의 항목들만 포함된 새로운 배열이 `toDos`에 할당됩니다. 그 후 re변수를 제거, 업데이트된 toDos를 localStorage에 저장합니다.
## 기능 구현 - 완료 표시 유무 부분
```jsx
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
```
- `paintToDo()`부분에 `div.addEventListener("click", CompleteTodoItem)`를 생성, 작성된 투두 리스트를 클릭하면 함수가 `CompleteTodoItem()`가 실행됩니다. 
## 기능 구현 - 완료 표시 유무 부분
```jsx
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
```
- 진짜 투두리스트를 만들면서 가장 그리고 제일 힘들었던 부분입니다. 만들면서 구글링도 많이하고 chatgpt한테 힌트도 얻으면서 이 부분은 확실하게 이해가 안가서 계속 봐야할 부분인거같습니다. 이거 때문에 진짜 별 생각을 다했네요... 많이 우울했습니다.
- 가능한 prompt는 사용하지 않고 만들고 싶었기에 마구 찾아봤습니다. `replaceChild`이 메소드는 처음본거 같아서 신기했습니다.
## 기능 구현 - 새로고침해도 다시 보이는 부분
```jsx
function gettodo() {
  const loadedTodo = localStorage.getItem("todos");
  // 'todos'라는 키로 로컬 스토리지에서 값을 가져오고, 그 값을 'loadedTodo' 변수에 할당합니다.
  if (loadedTodo !== null) {
    // localStorage에 "todos"라는 키로 저장된 값이 있다면
    const parseTodo = JSON.parse(loadedTodo);
    // localStorage에서 가져온 값을 JSON 형식으로 변환합니다.
    toDos = parseTodo;
    // 변환된 값을 toDos에 할당합니다. toDos를 업데이트 합니다.
    parseTodo.forEach(paintToDo);
    // 변환된 각 todo에 대해 paintToDo 함수를 실행해 화면에 그립니다.
    save();
    // todo를 localStorage에 다시 저장합니다.
  }
}

gettodo();
// gettodo 함수를 호출하여 실행합니다.
```
## 처음 프로젝트를 진행하고 느낀점
- 뭔가 클론코딩으로 진행했을 때는 코드 한줄한줄을 이해하고 백지 상태에서 작성도 해보고 했는데 똑같이 작성만! 할 줄 알았지 이걸 조금 다르게 해봐라 라고 한다면 너무 어려웠습니다. 문법만 공부하고 어떤 기능을 뚝딱 만들어봐라 하니까 너무 막연하더라구요. 
- 뭔가 조급하고 불안하고 우울한 마음을 느꼈습니다. 근데 이런 기분을 가지고 있어봤자 동굴속 깊이 빠져서 우울감엔 살기 싫었습니다. 그래서 일단 끝까지 한번 가보자 느꼈습니다. 죽기살기로 한번 해보겠습니다.
- "개발자는 계속 배워야 하는데 벌써 이런걸로 우울하면 개발자 하면 안된다 이런 일은 자주 일어날거다 그럴거면 관둬라" 이런걸 많이 봐서 그래도! 일단 해보고 결정하겠습니다. 열심히 준비해서 한번 결과로 보여드리겠습니다.
- 아직도 많이 부족하지만 문법 공부도 하면서 뭔가를 만들어 보면서 공부를 해보겠습니다.
## [To Do List](https://jinwoo5092.netlify.app) 입니다 혹시나 누군가 보신다면 따끔한 한 말씀이나 건강 잘 챙겨라 한마디 부탁드립니다! ㅋㅋ

인생은 항상 행복만 있는건 아닌거 같습니다. 이런일로 쓰러지지않고 뿌리내려 더 단단한 나무가 되겠습니다. 뭔가 첫 프로젝트 마무리와 기분이 섞어 글이 이상해지고 있네요 암튼 감사합니다!