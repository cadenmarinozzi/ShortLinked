import axios from 'axios';
import cookies from './cookies';
import { validateUser } from './validation';

axios.defaults.baseURL = 'https://short-linked.herokuapp.com/';
axios.defaults.headers = {
	'Content-Type': 'application/json',
};

async function login(user) {
	try {
		const response = await axios.post('login', user);

		return response.status === 200;
	} catch (err) {
		return false;
	}
}

async function signUp(user) {
	if (!validateUser(user)) return;

	const response = await axios.post('signup', user);

	return response.status === 200;
}

async function removeLink(link) {
	const response = await axios.post('remove', {
		user: {
			email: cookies.get('email'),
			password: cookies.get('password'),
		},
		link,
	});

	return response.status === 200;
}

async function shortenLink(link) {
	const response = await axios.post('shorten', {
		user: {
			email: cookies.get('email'),
			password: cookies.get('password'),
		},
		link,
	});

	return response.status === 200;
}

async function getLinks() {
	const response = await axios.post('links', {
		email: cookies.get('email'),
		password: cookies.get('password'),
	});

	return response.status === 200 && response.data;
}

// eslint-disable-next-line
export default { login, signUp, shortenLink, getLinks, removeLink };
