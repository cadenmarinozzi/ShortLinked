import {
	faRightToBracket,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import cookies from 'modules/cookies';
import {
	validateEmail,
	validatePassword,
	validateUsername,
} from 'modules/validation';
import web from 'modules/web';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async signUp() {
		const { email, password, username } = this.state;

		if (
			email &&
			password &&
			username &&
			(await web.signUp({ email, password, username }))
		) {
			cookies.set('email', email);
			cookies.set('password', password);

			window.location.href = '/';

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
					label='Username'
					required
					placeholder='link_shorter22'
					className='login-input'
					validate={validateUsername}
					error={this.state.error}
					onChange={(username) => {
						this.setState({
							username,
						});
					}}
				/>
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
					className='login-input'
					error={this.state.error}
					onChange={(password) => {
						this.setState({
							password,
						});
					}}
				/>
				<div className='login-submit'>
					<Button
						icon={faUserPlus}
						label='Sign Up'
						onClick={this.signUp.bind(this)}
						cta
					/>
					<Link to='/login'>
						<Button icon={faRightToBracket} label='Login' />
					</Link>
				</div>
			</div>
		);
	}
}

export default SignUp;
