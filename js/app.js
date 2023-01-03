const form = document.querySelector('form')
const wrapper = document.querySelector('.wrapper')
    // let arr = []
let arr = JSON.parse(localStorage.getItem('list')) ?
    JSON.parse(localStorage.getItem('list')) : [];

document.querySelector('input').focus()


function vaqt() {
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minut = date.getMinutes()
    let second = date.getSeconds()
    return `${hour<10? "0"+hour:hour} : ${minut<10? "0"+minut:minut} : ${(second<10)? "0"+second:second} 
    &nbsp; ${day<10? "0"+day:day}/${month<10? "0"+month:month}/${year}`
}

if (arr.length) showtodoes()

function localWrite() {
    localStorage.setItem('list', JSON.stringify(arr))
}

function showtodoes() {
    const arr = JSON.parse(localStorage.getItem('list'))
    wrapper.innerHTML = ""
    arr.forEach((item, i) => {
        wrapper.innerHTML += `
        <div ondblclick="setCompleted(${i})" class="item ${item.completed==true?'completed':''}" id="${item.id}">
        <div class="item_div">
            <p>${item.text}</p>
            <img onclick="tengla(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal" src="./img/closebtn.svg" alt="">
        </div>
        <small>${item.time}</small>
    </div>
        `
    });
}

function tengla(id) {
    let j = id
    document.querySelector('#deleting').addEventListener('click', () => {
        deleteItem(j);

    })
}

function deleteItem(id) {
    const deletedTodo = arr.filter((item, i) => {
        return i !== id
    })
    arr = deletedTodo;
    localWrite();
    showtodoes();
}

function setCompleted(id) {
    const completedTodo = arr.map((item, i) => {
        if (id == i) {
            return {...item, completed: item.completed == true ? false : true }
        } else {
            return {...item }
        }
    });
    arr = completedTodo;
    localWrite()
    showtodoes()
}




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input1')
    let inputText = input.value.trim();
    const randNum = Math.floor(Math.random() * 100000)


    if (inputText.length >= 3) {
        document.getElementById('emailHelp').style.display = 'none'
        arr.push({
            text: inputText,
            time: vaqt(),
            completed: false,
            id: randNum
        })
        localWrite()
        showtodoes()
            // console.log(arr);

        form.reset()
    } else {
        document.getElementById('emailHelp').style.display = 'inline-block'
        form.reset()
        setTimeout(() => {
            document.getElementById('emailHelp').style.display = 'none'

        }, 3000)
    }

})