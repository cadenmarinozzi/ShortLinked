import axios from 'axios';
import { validateUser } from './validation';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers = {
	'Content-Type': 'application/json',
};

async function login(user) {
	const response = await axios.post('login', user);

	return response.status === 200;
}

async function signUp(user) {
	if (!validateUser(user)) return;

	const response = await axios.post('signup', user);

	return response.status === 200;
}

async function shortenLink({ user, link }) {
	const response = await axios.post('shorten', { user, link });

	return response.status === 200;
}

async function getLinks(user) {
	const response = await axios.post('links', user);

	return response.status === 200 && response.data;
}

// eslint-disable-next-line
export default { login, signUp, shortenLink, getLinks };
