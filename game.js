import Deck from "./Deck.js";
import Player from "./Player.js";
import _ from 'underscore';

let players = [];
let shuffledDeck = Deck.shuffledDeck();
let trumpSuit = Deck.setTrump(shuffledDeck);
let playerCards = Deck.distributeCards(
    shuffledDeck
);


for (let i = 0; i < playerCards.length; i++) {
    players[i] = new Player(playerCards[i], i);
    players[i].trumpSuit = trumpSuit;
}
function startGame() {
    let round = 0;
    while (round < 13) {
        round++;
        let currentCardOnTable = [];
        let currentCard, currentSuit, maxValueCard = 0, maxCardOwner;
        for (let i = 0; i < 4; i++) {
            currentCard = players[i].playCard(currentCardOnTable, currentSuit);
            if (currentCardOnTable.length == 0) {
                currentSuit = currentCard["suit"];
            }
            if (maxValueCard < currentCard["rank"]) {
                maxValueCard = currentCard["rank"];
                maxCardOwner = i;
            }
            currentCardOnTable.push(currentCard);
        }
        players[maxCardOwner].handwins++;
    }
    let winner = _.max(players, function (player) {
        return player.handwins
    });
    console.log(winner.name);
}
startGame();
//console.log(playerCards);
