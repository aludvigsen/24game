var visma = visma || {};

visma.Card = (function (visma) {
    "use strict";

    function Card(suit, value) {
        function toString() {
            return "[Object Card<" + suit + ", " + value + ">]";
        }

        return {
            toString: toString,
            suit: suit,
            value: value
        };

    }

    Card.suits = ["hearts", "diamonds", "clubs", "spades"];
    Card.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10
//    ,11, 12, 13
    ];
    return Card;


})(visma);
