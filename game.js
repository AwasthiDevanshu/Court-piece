import Deck from "./Deck.js";
import Player from "./Player.js";
import _ from 'underscore';

let players = [];
let shuffledDeck = Deck.shuffledDeck();
let trumpSuit = Deck.setTrump(shuffledDeck);
let playerCards = Deck.distributeCards(
    shuffledDeck
);


for (let currentPlayer = 0; currentPlayer < playerCards.length; currentPlayer++) {
    players[currentPlayer] = new Player(playerCards[currentPlayer], "Player " + currentPlayer);
    players[currentPlayer].trumpSuit = trumpSuit;
}
function startGame() {
    let round = 0;
    let playingOrder = [[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2]];
    let nextTurdOrder = playingOrder[0];
    while (round < 13) {
        round++;
        let currentCardOnTable = [];
        let currentCard, currentSuit, maxValueCard = 0, maxCardOwner;
        nextTurdOrder.forEach(function (currentPlayer) {
            currentCard = players[currentPlayer].playCard(currentCardOnTable, currentSuit);
            console.log(currentCard);
            if (currentCardOnTable.length == 0) {
                currentSuit = currentCard["suit"];
            }
            if (maxValueCard < currentCard["rank"]) {
                maxValueCard = currentCard["rank"];
                maxCardOwner = currentPlayer;
            }
            currentCardOnTable.push(currentCard);    
        });
        console.log("Current Round table");
        console.log(currentCardOnTable);
        nextTurdOrder = playingOrder[maxCardOwner];
        
        console.log('Round Winner '+ players[maxCardOwner].name);
        players[maxCardOwner].handwins++;
    }
    let winner = _.max(players, function (player) {
        return player.handwins
    });
    console.log("Game Winner");
    console.log(winner.name);
}
startGame();
//console.log(playerCards);
