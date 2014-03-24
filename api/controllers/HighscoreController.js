/**
 * HighscoreController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	index : function(req, res, next) {

		Highscore.find().sort('timeused ASC').exec(function (err, scores) {
			if(err) {
				console.log(err);
			}
			res.view({scores: scores});
		})
	},

	create : function(req, res, next) {
		var score = {
			name: req.param('name'),
			mobile: req.param('mobile'),
			email: req.param('email'),
			timeused: req.param('timeused')
		}

		Highscore.create(score, function(err, createdScore) {
			if (err) {
				console.log(err);
			}
			return res.redirect('/highscore');
		})
	}
};
