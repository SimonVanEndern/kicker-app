import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript Test");


declare var io:any;

function listenOnGoal () {
    var socket = io("http://localhost:3000/");
    const player1 = document.getElementById('toore-spieler-1');
    const player2 = document.getElementById('toore-spieler-2');
    socket.on('motion', function () {
        console.log("motion");
        if (Math.random() > 0.5) {
            player1.innerText = parseInt(ele.innerText) + 1;
        } else {
            player2.innerText = parseInt(ele.innerText) + 1;
        }
    });
}

listenOnGoal();