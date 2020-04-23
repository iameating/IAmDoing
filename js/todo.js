// Select Element
const clear = document.querySelector(".clear-btn");
const dateElement = document.querySelector(".toDo__date");
const list = document.querySelector(".toDo__list");
const input = document.querySelector(".toDo__input");

// Classes names
const CHECK = "radio-button-on-outline";
const UNCHECK = "radio-button-off-outline";
const LINE_THROUGH = "lineThrough";

// Variable 
let List, id;

// get the item from LS
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    List = JSON.parse(data);
    id = List.length;
    loadList(List);
} else {
    List = [];
    id = 0;
}

// clear LS
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

// load items ti the interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// Showing Date
const today = new Date();
const option = {
    weekday: "long",
    month: "short",
    day: "numeric"
}
dateElement.innerText = today.toLocaleDateString("en-us", option);

// add to do
function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="toDo__list-items">
                    <ion-icon name="${DONE}" class="${DONE} list-icon" id="${id}" job="complete"></ion-icon>
                    <p class="toDo__list-text ${LINE}">${toDo}</p>
                    <ion-icon name="trash" class="toDo-del" id="${id}" job="delete"></ion-icon>
                 </li>
                  `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user hits enter 
function handleSubmit(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);
            List.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })

            // add item to LS
            localStorage.setItem("TODO", JSON.stringify(List));

            id++;
        }
        input.value = "";
    }
}

input.addEventListener("keyup", handleSubmit);


// complete to do
function completeToDo(element) {
    if (element.attributes.name.value === CHECK) {
        element.setAttribute("name", UNCHECK)
    } else if (element.attributes.name.value === UNCHECK) {
        element.setAttribute("name", CHECK)
    };
    element.parentNode.querySelector(".toDo__list-text").classList.toggle(LINE_THROUGH);

    List[element.id].done = List[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash = true;
}

// target items created dynamically
list.addEventListener("click", function () {
    const element = event.target;
    const elementJOB = element.attributes.job.value;

    if (elementJOB === "complete") {
        completeToDo(element);
    } else if (elementJOB === "delete") {
        removeToDo(element);
    }
    // add item to LS
    localStorage.setItem("TODO", JSON.stringify(List));
})