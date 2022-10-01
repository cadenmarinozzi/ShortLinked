const web = require('./modules/web');
const { validateUser } = require('./modules/validation');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
	res.status(200).send('ShortLinked');
});

app.post('/login', async (req, res) => {
	try {
		const user = req.body;

		if (await web.login(user)) {
			return res.status(200).send('OK');
		}

		res.status(401).send('Unauthorized');
	} catch (err) {
		console.error(err);

		res.status(500).send('Internal Server Error');
	}
});

app.post('/signup', async (req, res) => {
	try {
		const user = req.body;

		if ((await web.signUp(user)) && validateUser(user)) {
			return res.status(200).send('OK');
		}

		res.status(401).send('Unauthorized');
	} catch (err) {
		console.error(err);

		res.status(500).send('Internal Server Error');
	}
});

app.post('/shorten', async (req, res) => {
	try {
		const { user, link } = req.body;

		if ((await web.login(user)) && (await web.shortenLink(req.body))) {
			return res.status(200).send('OK');
		}

		res.status(401).send('Unauthorized');
	} catch (err) {
		console.error(err);

		res.status(500).send('Internal Server Error');
	}
});

app.post('/links', async (req, res) => {
	try {
		const user = req.body;

		if (await web.login(user)) {
			const links = await web.getLinks(user);

			return res.status(200).send(links);
		}

		res.status(401).send('Unauthorized');
	} catch (err) {
		console.error(err);

		res.status(500).send('Internal Server Error');
	}
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`ShortLinked backend running on port: ${port}`);
});
