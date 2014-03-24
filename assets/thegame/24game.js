var visma = visma || {};

visma.game = (function (Card) {
    "use strict";

    function drawFromNewDeck(numberOfCards) {
        var deck = [];
        var cards = [];
        Card.suits.forEach(function (suit) {
            Card.values.forEach(function (cardValue) {
                deck.push(new Card(suit, cardValue));
            });
        });
        if (numberOfCards > deck.length) {
            throw "Can't down more cards than the size of the deck";
        }
        for (var cardIndex = 1; cardIndex <= numberOfCards; cardIndex++) {
            var item = Math.floor(Math.random() * deck.length);
            cards[cardIndex - 1] = deck.splice(item, 1)[0];
        }
        return cards;
    }

    function verifyAnswer(cards, answer) {
        validateCards(cards, answer);
        return eval(answer) === 24;
    }

    function validateCards(cards, answer) {
        var filteredResult = answer.split(/[(|)|\-|*|/|\+| ]/).filter(Number); // split on ()+-*/ and spaces
        cards.forEach(function (card) {
            var index = filteredResult.indexOf("" + card.value);
            if (index === -1) {
                throw "Could not find value " + card + " in answer " + answer;
            }
            filteredResult.splice(index, 1);
        });
        if (filteredResult.length !== 0) {
            throw "Missing values in answer " + filteredResult;
        }
    }

    return {
        drawFromNewDeck: drawFromNewDeck,
        verifyAnswer: verifyAnswer
    };

})(visma.Card);
