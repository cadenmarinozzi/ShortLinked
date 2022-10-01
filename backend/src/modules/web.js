const { initializeApp } = require('firebase/app');
const {
	get,
	getDatabase,
	ref,
	set,
	child,
	update,
} = require('firebase/database');
const { v4: uuid } = require('uuid');
const { sha256 } = require('js-sha256');

require('dotenv').config();

const firebaseConfig = {
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID,
	measurementId: process.env.FIREBASE_MEASUREMENTID,
	databaseURL: process.env.FIREBASE_DATABASEURL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersRef = ref(database, 'users');
const emailsRef = ref(database, 'emails');
const linksRef = ref(database, 'links');

async function getEmails() {
	const emailsSnapshot = await get(emailsRef);

	return emailsSnapshot.exists() && emailsSnapshot.val();
}

async function getUserId(email) {
	const emails = await getEmails();

	if (!emails) return;

	for (const [userId, user] of Object.entries(emails)) {
		if (user.email === email) {
			return userId;
		}
	}
}

async function getUserRef(user) {
	const userId = await getUserId(user.email);

	return userId && child(usersRef, userId);
}

async function getUser(user) {
	const userRef = await getUserRef(user);

	if (!userRef) return;

	const userSnapshot = await get(userRef);

	return userSnapshot.exists() && userSnapshot.val();
}

async function createUser(user) {
	const userSnapshot = await getUser(user);

	if (!userSnapshot) {
		const userId = uuid();

		await set(child(usersRef, userId), user);
		await set(child(emailsRef, userId), { email: user.email, userId });
	}
}

async function shortenLink({ user, link }) {
	const linkId = uuid();
	const linkRef = child(linksRef, linkId);

	await set(linkRef, link);

	const userRef = await getUserRef(user);

	await update(child(userRef, 'links'), {
		[linkId]: {
			...link,
			linkId: linkId,
		},
	});

	return linkId;
}

async function getLinks(user) {
	const userRef = await getUserRef(user);

	if (!userRef) return;

	const userSnapshot = await get(userRef);

	if (userSnapshot.exists()) {
		const links = userSnapshot.val().links;

		if (!links) return;

		return Object.values(links).map((link) => {
			return {
				fromURL: link.fromURL,
				toURL: link.newUrlPrefix,
			};
		});
	}
}

async function getAllLinks() {
	const linksSnapshot = await get(linksRef);

	return linksSnapshot.exists() && linksSnapshot.val();
}

async function login(user) {
	const userSnapshot = await getUser(user);

	if (userSnapshot) {
		return userSnapshot.password === sha256(user.password);
	}
}

async function signUp(user) {
	const userSnapshot = await getUser(user);

	if (!userSnapshot) {
		user.password = sha256(user.password);
		await createUser(user);

		return true;
	}
}

module.exports = { login, signUp, shortenLink, getLinks, getAllLinks };
