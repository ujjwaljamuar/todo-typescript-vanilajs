import "./style.css";

interface Todo {
    title: string;
    isCompleted: boolean;
    readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
    ".todosContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const todo: Todo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Math.random() * 1000),
    };

    todos.push(todo);

    todoInput.value = "";
    renderTodo(todos);
    // console.log(todos);
};

const generateTodoElement = (
    title: string,
    isCompleted: boolean,
    id: string
) => {
    const todo: HTMLDivElement = document.createElement("div");
    todo.className = "todo";

    // checkbox element
    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "isCompleted";
    checkBox.checked = isCompleted;
    checkBox.onchange = () => {
        todos.find((item) => {
            if (item.id === id) item.isCompleted = checkBox.checked;
        });
        paragraph.className = checkBox.checked ? "textCut" : "";
    };

    // paragraph element
    const paragraph: HTMLParagraphElement = document.createElement("p");
    paragraph.innerText = title;
    paragraph.className = isCompleted ? "textCut" : "";

    //create delete button
    const btn: HTMLButtonElement = document.createElement("button");
    btn.innerText = "X";
    btn.className = "deleteBtn";
    btn.onclick = () => {
        deleteTodo(id);
    };

    //appending all to div
    todo.append(checkBox, paragraph, btn);

    todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
    const index = todos.findIndex((item) => item.id === id);
    todos.splice(index, 1);

    renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
    todosContainer.innerText = "";
    todos.forEach((item) => {
        generateTodoElement(item.title, item.isCompleted, item.id);
    });
};
