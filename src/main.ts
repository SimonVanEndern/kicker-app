import { sayHello } from "./greet";

function showHello(divName:string, name:string) {
    //const elt = document.getElementById(divName);
    //elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript Test");


declare var io:any;

declare var angular:any;

var app = angular.module("myApp", []);
app.controller('myController', function ($http, $scope) {

    vm.
    var vm = this;

    vm.getBests = function () {
        vm.bests = $http.get("http://localhost:3000/best")
            .then(function (res) {
                vm.bests = res.data;
                console.log(res);
            });
    };

    vm.getBests();

    vm.player2 = "";
    vm.player1 = "";
    vm.torePlayer1 = 0;
    vm.torePlayer2 = 0;
    vm.running = false;
    vm.startGame = function () {
        vm.running = !vm.running;
        vm.torePlayer1 = 0;
        vm.torePlayer2 = 0;
        vm.game = vm.playing();
        console.log("Game started");
    };

    vm.playing = function () {
        var socket = io("http://localhost:3000/");
        socket.on('motion', function () {
            console.log("motion");
            if (Math.random() > 0.5) {
                vm.torePlayer1 += 1;
            } else {
                vm.torePlayer2 += 1;
            }
            $scope.$digest();

            if (vm.torePlayer1 == 3) {
                console.log("end");
                vm.stopGame(vm.player1, vm.player2, vm.torePlayer2);
            }
            if (vm.torePlayer2 == 3) {
                vm.stopGame(vm.player2, vm.player2, vm.torePlayer1);
                console.log("end");
            }
        });
        return socket;
    };

    vm.stopGame = function (winner : string, loser : string, goalsLoser : number) {
        vm.lastwinner = winner;
        vm.game.close();
        vm.game.destroy();
        console.log("Stopping");
        vm.running = !vm.running;
        $http.post("http://localhost:3000/save", {
            game: {
                sieger: winner,
                verlierer: loser,
                toreVerliere: goalsLoser,
                time: (new Date()).getTime()
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => vm.getBests());
    }
});