function validateUsername(username) {
	return (
		username &&
		typeof username === 'string' &&
		username.length > 4 &&
		username.length < 20
	);
}

function validateEmail(email) {
	return new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(
		email
	);
}

function validatePassword(password) {
	return (
		password &&
		typeof password === 'string' &&
		password.length > 7 &&
		password.length < 50
	);
}

function validateUser(user) {
	return (
		validateUsername(user.username) &&
		validateEmail(user.email) &&
		validatePassword(user.password)
	);
}

module.exports = {
	validateUser,
	validateUsername,
	validateEmail,
	validatePassword,
};
