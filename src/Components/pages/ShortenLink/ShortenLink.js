import Input from 'Components/shared/Input';
import {
	faUser,
	faDice,
	faCheck,
	faPlus,
	faTrash,
	faXmark,
	faEye,
	faEyeSlash,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import './ShortenLink.scss';
import Button from 'Components/shared/Button';
import Toggle from 'Components/shared/Toggle';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import web from 'modules/web';
import cookies from 'modules/cookies';

function generatePrefix() {
	let prefix = '';

	for (let i = 0; i < 7; i++) {
		const numerical = Math.random() >= 0.5;
		prefix += numerical
			? Math.round(Math.random() * 9)
			: String.fromCharCode(
					Math.floor(Math.random() * 26) + 97
			  ).toUpperCase();
	}

	return prefix;
}

class ShortenLink extends Component {
	constructor() {
		super();

		this.state = {
			newUrlPrefix: generatePrefix(),
		};
	}

	async shortenLink() {
		let { newUrlPrefix, fromURL, expirationDate } = this.state;

		if (!newUrlPrefix || !fromURL) {
			return;
		}

		if (!fromURL.includes('https://') && !fromURL.includes('http://')) {
			fromURL = `https://${fromURL}`;
		}

		const link = {
			newUrlPrefix,
			fromURL,
		};

		if (expirationDate) {
			link.expirationDate = expirationDate;
		}

		await web.shortenLink({
			link,
			user: {
				email: cookies.get('email'),
				password: cookies.get('password'),
			},
		});

		window.location.href = '/';
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
				<div className='shorten-link-controls center'>
					<Input
						label='URL'
						placeholder='placeholderUrl.net/link'
						required
						tooltip='The URL to shorten.'
						className='shorten-link-input'
						onChange={(fromURL) => {
							this.setState({
								fromURL,
							});
						}}
					/>
					<Input
						label='New URL'
						buttonIcon={faDice}
						tooltip='The ShortLinked URL to redirect the original URL to.'
						className='shorten-link-input'
						value={`ShortLinked.com/${this.state.newUrlPrefix}`}
						onChange={(newUrl) => {
							if (newUrl.length <= 'ShortLinked.com'.length) {
								this.setState({ newUrlPrefix: '' });

								return;
							}

							this.setState({
								newUrlPrefix: newUrl.replace(
									'ShortLinked.com/',
									''
								),
							});
						}}
						onButtonIconClick={() =>
							this.setState({
								newUrlPrefix: generatePrefix(),
							})
						}
					/>
					<Input
						label='Expiration Date'
						placeholder='14/3/2022'
						disabledButtonIcon={faXmark}
						enabledButtonIcon={faCheck}
						tooltip='The date at which the shortened link should no longer redirect.'
						className='shorten-link-input'
						onChange={(expirationDate) => {
							this.setState({
								expirationDate,
							});
						}}
					/>
					<div className='shorten-link-submit'>
						<Button
							icon={faPlus}
							label='Shorten Link'
							onClick={this.shortenLink.bind(this)}
							cta
						/>
						<Link to='/'>
							<Button icon={faTrash} label='Cancel' secondary />
						</Link>
						<Toggle enabledIcon={faEye} disabledIcon={faEyeSlash} />
					</div>
				</div>
			</>
		);
	}
}

export default ShortenLink;
