var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var ipAgentSchema = new Schema({
	date: { type: Date, required: true },
	ipaddress: { type: String, required: true },
	os: { type: String, required: true },
	device: { type: String, required: true },
	browser: { type: String, required: true }
});

var userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: false },
	admin: { type: Boolean, required: true },
	email: { type: String },
	givenName: { type: String },
	familyName: { type: String },
	googleId: { type: String },
	twitterId: { type: String },
	facebookId: { type: String },
	login: ipAgentSchema,
	registered: ipAgentSchema
});

userSchema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
