import Card from "./Card.js";
import _ from 'underscore';

export default {
    shuffledDeck() {
        let cards = this.createDeck();
        return _.shuffle(cards);
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



