// inicializacion de variables
let uncoveredcards = 0;
let card1 = null;
let card2 = null;
let firstresult = null;
let secondresult = null;
let moves = 0;
let aciertos = 0;
let timer = false;
let time = 180;
let initialtime = 180;
let tiemporegresivo = null;
let puntaje = 0;
let puntajeMax = 100;
let scoreList = [];

//Apuntandores al HTML
let showmoves = document.getElementById('movimientos');
let showaciertos = document.getElementById('puntos');
let showtime = document.getElementById('t-restante');
;

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

// funciones

function start() {

    if (timer == false) {
        timeCounter();
        timer = true;
    }


    if (document.getElementById('info').value != '') {
        document.getElementById('gameTable').style.visibility = 'visible';
    }
}


function timeCounter(){
    tiemporegresivo = setInterval(()=>{
        time--;
        showtime.innerHTML = `Tiempo ${time} segundos`;
        if(time == 0){
            clearInterval(tiemporegresivo);
            blockcards();
            showtime.innerHTML = `Tiempo agotado`
        }
    },1000)
}

function blockcards() {
    for (let i = 0; i <= 15; i++) {
        let blockcard = document.getElementById(i);
        blockcard.innerHTML = `<img src="./images/${numbers[i]}.jpg" alt="">`;
        blockcard.disabled = true;
        
    }

}



function saveuser(user, points) {

    let person = {
        name: user,
        puntos: points,
    };

    scoreList.push(person);
    expandStorage(scoreList);

}

function getUserList(){
    let lista = localStorage.getItem("users");
    if (lista == null) {
        scoreList = [];
    }else{
        scoreList = JSON.parse(lista);
    }
    return scoreList;
}


function expandStorage(list){
    localStorage.setItem("users", JSON.stringify(list));

}

function score(){
    
    document.getElementById("scoreTable").style.visibility = 'visible';
    let lista = getUserList();
    
    lista.sort((x,y) => y.puntos - x.puntos);
    //console.log(lista[0].name); 

    for(let i = 0; i < lista.length ; i++){
        
        let showu = document.getElementById(99-((3*i)+1)); 
        let showp = document.getElementById(98-((3*i)+1));
        let u = lista[i].name;
        let p = lista[i].puntos;

        
        if((i+1) == document.getElementById(99-(3*i)).innerHTML){
           
            showu.innerHTML = u;
            showp.innerHTML = Math.round(p);
        }

    }

}


function reset(){
    location.reload();
    unlockcards();
    timeCounter();

}


function uncover(id) {

    uncoveredcards++;

    if (uncoveredcards == 1) {
        
        card1 = document.getElementById(id);
        firstresult = numbers[id];
        card1.innerHTML = `<img src="./images/${firstresult}.jpg" alt="">`;

        card1.disabled = true;

    } else if (uncoveredcards == 2) {
      
        card2 = document.getElementById(id);
        secondresult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondresult}.jpg" alt="">`;

        
        card2.disabled = true;

     
        moves++;
        showmoves.innerHTML = `Movimientos: ${moves}`;

        if (firstresult == secondresult) {
            
            uncoveredcards = 0;

            aciertos++;
            
            showaciertos.innerHTML = `Puntos: ${puntajeMax * (time / initialtime)}`;

            if (aciertos == 8) {
                clearInterval(tiemporegresivo);
                saveuser(document.getElementById('info').value, puntajeMax * (time / initialtime));
                showaciertos.innerHTML = `Puntos: ${Math.round(puntajeMax * (time / initialtime))} 😁`;
                showtime.innerHTML = `Tiempo Total: ${initialtime - time}`;
                showmoves.innerHTML = `Movimientos: ${moves} 👌`;

            }

        } else {

        
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredcards = 0;

            }, 800);
        }

    }
}