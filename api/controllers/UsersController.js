/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
	index : function(req, res, next) {

		Highscore.find().sort('timeused ASC').exec(function (err, users) {
			if(err) {
				console.log(err);
			}
			res.view({users: users});
		});
	},

	destroy : function(req, res, next) {

		Highscore.destroy().exec(function (err) {
			if(err) {
				console.log(err);
			}
			res.redirect('/users');
		});
	},
};
