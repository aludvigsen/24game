var visma = visma || {};

visma.GameLoop = (function(){
    "use strict";

    function GameLoop(game) {

        var cards, startTime, timeUsed, answered, verifiedAnswer;
        this.game = game;

        this.newGame = function () {
            cards = game.drawFromNewDeck(4);
            startTime = new Date().getTime();
        };

        this.timeUsed = function () {
            return timeUsed;
        };

        this.cards = function() {
            return cards;
        };

        this.isCorrectAnswer = function () {
            return verifiedAnswer === true;
        };

        this.answer = function (answerValue) {
            if (timeUsed !== null) {
                console.log("Can't answer two times");
            }
            answered = answerValue;
            timeUsed = this.msToObj(new Date().getTime() - startTime);
            try {
                verifiedAnswer = game.verifyAnswer(cards, answerValue);
            } catch (err) {
                verifiedAnswer = err;
            }
        };

        this.msToObj = function (ms) {
            var d, h, m, s;
            s = parseFloat(Math.round((ms / 1000) * 100) / 100).toFixed(2);
            m = Math.floor(s / 60);
            s = (s % 60).toFixed(2);
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return { d: d, h: h, m: m, s: s };
        };
    }

    return GameLoop;

})(visma);

