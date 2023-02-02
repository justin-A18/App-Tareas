//TIME
const $dayNumber = document.getElementById('day-number');
const $month = document.getElementById('month');
const $year = document.getElementById('year');
const $week = document.getElementById('day-week');

setInterval(() => {
    let date = new Date();
    let mes = date.getMonth();
    let numeroDia = date.getDate();
    let anho = date.getFullYear();
    let semana = date.getDay()
    
    //DIA
    $dayNumber.innerText = numeroDia;

    //AÑO
    $year.innerText = anho;

    //MES
    switch (mes) {
        case 0:
            mes = "Ene"
            $month.innerText = mes;
        break;
        case 1:
            mes = "Feb"
            $month.innerText = mes;
        break;
        case 2:
            mes = "Mar"
            $month.innerText = mes;
        break;
        case 3:
            mes = "Abr"
            $month.innerText = mes;
        break;
        case 4:
            mes = "May"
            $month.innerText = mes;
        break;
        case 5:
            mes = "Jun"
            $month.innerText = mes;
        break;
        case 6:
            mes = "Jul"
            $month.innerText = mes;
        break;
        case 7:
            mes = "Ago"
            $month.innerText = mes;
        break;
        case 8:
            mes = "Sept"
            $month.innerText = mes;
        break;
        case 9:
            mes = "Oct"
            $month.innerText = mes;
        break;
        case 10:
            mes = "Nov"
            $month.innerText = mes;
        break;
        case 11:
            mes = "Dic"
            $month.innerText = mes;
        break;
        default:
            mes = "Fecha no existe";
            $month.innerText = mes;
        break;
    }

    // SEMANA
    switch (semana) {
        case 0:
            semana = "Domingo";
            $week.innerText = semana;
        break;
        case 1:
            semana = "Lunes";
            $week.innerText = semana;
        break;
        case 2:
            semana = "Martes";
            $week.innerText = semana;
        break;
        case 3:
            semana = "Miercoles";
            $week.innerText = semana;
        break;
        case 4:
            semana = "Jueves";
            $week.innerText = semana;
        break;
        case 5:
            semana = "Viernes";
            $week.innerText = semana;
        break;
        case 5:
            semana = "Sabado";
            $week.innerText = semana;
        break;
        default:
            break;
    }
});

//TAREA
const $lista = document.getElementById("list");
const $input = document.getElementById("tarea");
const $btnEnter = document.getElementById("agregar");
const check = `bx-check-circle`;
const uncheck = `bx-circle`;
const lineThrough = `line-through`;
let id;
let LIST;


//Funcion Agregar Tarea

function agregarTarea(Tarea,id,realizado,eliminado){


    if(eliminado){return}

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : "";

    const elemento = `
    <li class="lista">
        <i class= 'bx ${REALIZADO} bx-lg' data="realizado" id=${id}></i>
        <p class="text ${LINE}">${Tarea}</p>
        <i class='bx bxs-trash bx-lg' data="eliminado" id=${id}></i>
    </li>
    `

    $lista.insertAdjacentHTML("beforeend", elemento);

}

//ejecutando Tarea

$btnEnter.addEventListener("click", () => {
    const tarea = $input.value;

    if(tarea){
        agregarTarea(tarea,id,false,false);
        LIST.push({
            tarea,
            id,
            realizado:false,
            eliminado:false,
        })
    }

    localStorage.setItem("todo",JSON.stringify(LIST))
    $input.value = "";
    id++;
});

//ejecutar tarea con un Enter

document.addEventListener("keyup", (e) => {
    if(e.keyCode === "Enter"){
        const tarea = $input.value;
        
        if(tarea){
            agregarTarea(tarea,id,false,false);
            LIST.push({
                tarea,
                id,
                realizado:false,
                eliminado:false,
            })
        }

        localStorage.setItem("todo",JSON.stringify(LIST))
        $input.value = "";
        id++;
    }
})

//Function Tarea Realizada

function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

//Function Tarea Eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
}

//BTNS

$lista.addEventListener("click", (e) => {
    const element = e.target;
    const elementData = element.attributes.data.value;

    if(elementData === "realizado"){
        tareaRealizada(element);
        $lista.querySelector(".lista").classList.toggle("lista-b")
    }
    else if (elementData === "eliminado"){
        tareaEliminada(element);
    }

    localStorage.setItem("todo",JSON.stringify(LIST))
})

//setItem => agregar 
//localeStorage.setItem("Todo".json.stringify(LIST))

//getItem => Objetener
//localeStorage.getItem("Todo");

let data = localStorage.getItem("todo");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
}else{
    LIST = [];
    id = 0;
}

function cargarLista(DATA){
    DATA.forEach(i => {
        agregarTarea(i.tarea,i.id,i.realizado,i.eliminado)
    });
}