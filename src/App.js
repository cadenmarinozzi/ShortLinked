import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Footer from './Components/containers/Footer';
import ShortenLink from './Components/pages/ShortenLink';
import Settings from './Components/pages/Settings';
import Login from 'Components/pages/Login';
import SignUp from 'Components/pages/SignUp';
import { Component } from 'react';
import cookies from 'modules/cookies';
import web from 'modules/web';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		const email = cookies.get('email');
		const password = cookies.get('password');

		if (email && password) {
			const loggedIn = await web.login({ email, password });

			this.setState({
				loggedIn,
				loaded: true,
			});

			return;
		}

		this.setState({
			loaded: true,
		});
	}

	render() {
		return (
			this.state.loaded && (
				<HashRouter>
					{this.state.loggedIn ? (
						<Routes>
							<Route path='*' element={<Home />} />
							<Route path='/shorten' element={<ShortenLink />} />
							<Route path='/settings' element={<Settings />} />
						</Routes>
					) : (
						<Routes>
							<Route path='*' element={<Login />} />
							<Route path='/signup' element={<SignUp />} />
							<Route path='/login' element={<Login />} />
						</Routes>
					)}
					<Footer />
				</HashRouter>
			)
		);
	}
}

export default App;
