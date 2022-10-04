import {
	faRightToBracket,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import { validateEmail, validatePassword } from 'modules/validation';
import web from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async login() {
		const { email, password } = this.state;

		if (email && password && (await web.login({ email, password }))) {
			cookies.set('email', email);
			cookies.set('password', password);

			window.location.reload();

			return;
		}

		this.setState({
			error: 'Invalid email or password.',
		});
	}

	render() {
		return (
			<div className='login center'>
				<Input
					label='Email'
					required
					validate={validateEmail}
					placeholder='link_shorter22@gmail.com'
					tooltip='The email associated with your account.'
					className='login-input'
					error={this.state.error}
					onChange={(email) => {
						this.setState({
							email,
						});
					}}
				/>
				<Input
					label='Password'
					required
					validate={validatePassword}
					placeholder='•••••••••••••'
					tooltip='The password to access your account.'
					type='password'
					error={this.state.error}
					className='login-input'
					onChange={(password) => {
						this.setState({
							password,
						});
					}}
				/>
				<div className='login-submit'>
					<Button
						icon={faRightToBracket}
						label='Login'
						onClick={this.login.bind(this)}
						cta
					/>
					<Link to='/signup'>
						<Button icon={faUserPlus} label='Sign Up' />
					</Link>
				</div>
			</div>
		);
	}
}

export default Login;
