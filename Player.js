import _ from 'underscore';
export default class Player {

    cards;
    handwins;
    trumpSuit;
    name;
    constructor(cards, name) {
        this.cards = this.arrangeCards(cards);
        this.handwins = 0;
        this.name = name;
    }
    playCard(currentTable, currentSuit) {

        if (currentTable.length > 0) {
            let maxCurrentRank = this.getMaxValueCard(currentTable);
            if (!_.isEmpty(this.cards[currentSuit])) {
                let maxSuitRank = _.last(this.cards[currentSuit]).rank;
                if (maxSuitRank > maxCurrentRank) {
                    return this.cards[currentSuit].pop();
                }
                else {
                    return this.cards[currentSuit].shift();
                }
            } else {
                let maxSuitRank = _.last(this.cards[this.trumpSuit]);
                if (maxSuitRank > maxCurrentRank) {
                    return this.cards[this.trumpSuit].pop();
                }
                else {
                    return this.minCard();
                }
            }

        } else if (currentTable.length == 0) {
            return this.minCard();
        }
    }

    minCard() {
        let selectedSuit = _.min(this.cards, function (cardSet) {
            if (_.isEmpty(cardSet)) {
                return 50;
            }
            let firstCard = _.first(cardSet);
            return firstCard.rank;
        });
        return this.cards[selectedSuit[0].suit].shift();
    }
    arrangeCards(cards) {
        let groupedCards = _.groupBy(cards, function (card) {
            return card["suit"];
        });
        return _.mapObject(groupedCards, function (cardSet) {
            return _.sortBy(cardSet, 'rank');
        })
    }
    getMaxValueCard(cardSet) {
        return _.max(cardSet, function (card) {
            return card.rank;
        });
    }
}
