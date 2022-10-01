import {
	faArrowLeft,
	faCircleExclamation,
	faTrash,
	faUser,
	faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/shared/Button';
import Input from 'Components/shared/Input';
import PopUp from 'Components/shared/PopUp';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	validateUsername,
	validateEmail,
	validatePassword,
} from 'modules/validation';
import './Settings.scss';

class Settings extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<>
				<div className='header'>
					<Link to='/'>
						<Button label='Back' icon={faArrowLeft} />
					</Link>
					<Link to='/settings'>
						<Button icon={faUser} circle secondary />
					</Link>
				</div>
				<div className='edit-user-controls center'>
					<Input
						label='Update Username'
						placeholder='link_shorter22'
						className='edit-user-input'
						validate={validateUsername}
						onChange={() => {
							this.setState({});
						}}
					/>
					<Input
						label='Update Email'
						validate={validateEmail}
						placeholder='link_shorter22@gmail.com'
						tooltip='The email associated with your account.'
						className='edit-user-input'
					/>
					<Input
						label='Update Password'
						validate={validatePassword}
						placeholder='•••••••••••••'
						tooltip='The password to access your account.'
						type='password'
						className='edit-user-input'
					/>
					<div className='edit-user-submit'>
						<Button icon={faUserPen} label='Update User' cta />
						<Link to='/'>
							<Button icon={faTrash} label='Cancel' secondary />
						</Link>
					</div>
				</div>
				<Button
					className='remove-user-button'
					icon={faTrash}
					label='Delete User'
					secondary
					onClick={() =>
						this.setState({
							showDeleteAccountPopup: true,
						})
					}
				/>
				{this.state.showDeleteAccountPopup && (
					<PopUp
						icon={faCircleExclamation}
						message='Are you sure you want to delete your account? This action cannot be undone.'>
						<Button
							icon={faTrash}
							label='Delete Account'
							secondary
						/>
						<Button
							label='Cancel'
							onClick={() =>
								this.setState({
									showDeleteAccountPopup: false,
								})
							}
						/>
					</PopUp>
				)}
			</>
		);
	}
}

export default Settings;
