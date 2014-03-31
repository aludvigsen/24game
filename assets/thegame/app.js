var visma = visma || {};

visma.app = (function (GameLoop, game, $) {
    "use strict";

    var gameLoop,
        $submitBtn, $showTimeUsed, $timeused, $answerbox,
        $submitAnswerDiv, $gameDiv, $cards, $checkAnswer,
        $answerValue, $infobox, $newgameBtn, $operators;

    function main($dom) {
        $submitAnswerDiv = $dom.find("#submitAnswerDiv");
        $gameDiv = $dom.find("#gameDiv");
        $cards = $dom.find("#cards");
        $checkAnswer = $dom.find("#checkAnswer");
        $answerValue = $dom.find("#answerbox");
        $infobox = $dom.find("#info");
        $submitBtn = $dom.find("#submitBtn");
        $showTimeUsed = $dom.find("#showTimeUsed");
        $timeused = $dom.find("#timeused");
        $answerbox = $dom.find("#answerbox");
        $newgameBtn = $dom.find("#newgameBtn");
        $operators = $dom.find("#operators div");

        init();
    }

    function init() {
        gameLoop = new GameLoop(game);

        $submitBtn.on("click", function () {
            //console.log("got answer", $answerValue.find("span").text());
            gameLoop.answer($answerValue.find("span").text());
            var isCorrect = gameLoop.isCorrectAnswer();
            var timeUsed = gameLoop.timeUsed();
            if (isCorrect) {
                //console.log("correct answer, show the submit form");
                var tidMelding = showMeTheTime(timeUsed);
                $showTimeUsed.html("Tid brukt: <span>" + tidMelding + "</span>");
                $timeused.val(eval(timeUsed.s + "+" + timeUsed.m + "*60"));
                //console.log(timeUsed);
                clearAndSetView("submit");
            } else {
                wrongAnswer();
            }
        });

        $newgameBtn.on("click", function () {
            startGame();
        });

        $("#howtoplayBtn").on("click", function () {
            $("#howToPlay").slideToggle();
        });
    }

    function wrongAnswer() {
    	//console.log("wrong answer, restarting the game");
        var fv = [
        	'Noooo!', 
        	'Wrong.', 
        	'Ah, try again!', 
        	'Still wrong, buddy.', 
        	'Not there yet', 
        	'24, the name of the game'
        ];
		var randomFeilmelding = fv[Math.floor(fv.length * Math.random())];
        $infobox.html("<h1 id='wrongAnswer'>" + randomFeilmelding + "</h1>");
        $infobox.show().delay(1000).fadeOut();
        startGame();
    }

    function startGame() {
        clearAndSetView("game");

        gameLoop.newGame();
        var cards = gameLoop.cards();

        for (var i = 0; i < cards.length; i++) {
            var $span = $("<span>" + cards[i].value + "</span>");
            $cards.append($("<div class='cardLgBtn " + cards[i].suit + "'></div>").append($span));
        }
        makeItSortable();
    }

    function clearAndSetView(view) {
        //console.log("change view ", view);
        if ("game" === view) {
            $checkAnswer.unbind();
            $submitAnswerDiv.hide();
            $gameDiv.show();

            $cards.children("div").remove();
            $answerValue.empty();
        } else if ("submit" === view) {
            $submitAnswerDiv.show();
            $gameDiv.hide();
        } else {
            throw "Unknown view";
        }
    }

    function makeItSortable() {
        $answerbox.sortable({
            revert: false,
            receive: function (event, ui) {
                var element = ui.item;
                if (element.hasClass("cardLgBtn")) {
                    element.draggable("option", "disabled", "true");
                }
                $($(this).data()["ui-sortable"].currentItem[0]).click(function (e) {
                    if (element.hasClass("cardLgBtn")) {
                        element.draggable("enable");
                        $(this).remove();
                    } else {
                        $(this).remove();
                    }
                });

            },
            placeholder: "sortable-placeholder"
        });

        $cards.disableSelection();

        $cards.find("div").draggable({
            connectToSortable: "#answerbox",
            helper: "clone",
            revert: "invalid",
            start: function (event, ui) {
                $(this).draggable("option", "cursorAt", {
                    left: Math.floor(this.clientWidth / 2),
                    top: Math.floor(this.clientHeight / 2)
                });
            }
        });

        $operators.draggable({
            connectToSortable: "#answerbox",
            helper: "clone",
            revert: "invalid",
            start: function (event, ui) {
                $(this).draggable("option", "cursorAt", {
                    left: Math.floor(this.clientWidth / 2),
                    top: Math.floor(this.clientHeight / 2)
                });
            }
        });
    }

    function showMeTheTime(time) {
        var melding = "";
        var numEnding = "er";
        if (time.m > 0) {
            melding += time.m + " minutt";
            melding += time.m < 2 ? " og " : numEnding + " og ";
        }
        melding += time.s + " sekund";
        melding += time.s < 2 ? "." : numEnding + ".";
        return melding;
    }

    return {
        main: main,
        init: init,
        startGame: startGame
    };

})(visma.GameLoop, visma.game, jQuery);