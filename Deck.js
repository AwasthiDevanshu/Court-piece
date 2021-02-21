import Card from "./Card.js";
import _ from 'underscore';

export default {
    shuffledDeck() {
        let cards = this.createDeck();
        return _.shuffle(cards);


        /* //shuffle cards
        let cardId = cards.length;
        while (0 !== cardId) {
            // Pick a remaining element
            let randId = _.random(0, cardId);
            cardId -= 1;
            // Swap it with the current element.
            let tmp = cards[cardId];
            cards[cardId] = cards[randId];
            cards[randId] = tmp;
        }
        return cards;
        */
    },
    createDeck() {
        let cards = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                cards[j + 13 * i] = new Card(i, j);
            }
        }
        return cards;
    },
    distributeCards(cards) {
        return _.chunk(cards, 13);


        /* //split cards between players
        let player = [];     
        for (let i = 0; i < 4; i++) {
            let temp = [];
            for (let j = 0; j < 13; j++) {
                temp[j] = cards[j + 13 * i];
            }
            player[i] = temp;
        }
        return player; */
    },
    setTrump(cards) {
        let trumpSuit = _.random(0, 4);
        _.map(cards, function (card) {
            if (card["suit"] == trumpSuit) {
                card.rank += 13;
            }
            return card;
        })
        return trumpSuit;
    }


}



