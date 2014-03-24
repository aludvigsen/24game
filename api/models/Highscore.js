/**
 * Highscore.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		name: {
			type: 'STRING',
			required: true
		},
		mobile: {
			type: 'STRING',
			required: true
		},
		email: {
			type: 'STRING',
			email: true,
			required: true,
			unique: true
		},
		timeused: {
			type: 'FLOAT',
			required: true
		},

		toJSON: function() {
			var obj = this.toObject();
			delete obj.mobile;
			delete obj.email;
			return obj;
		}
	}

};
