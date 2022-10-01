import Button from 'Components/shared/Button';
import {
	faPlus,
	faUser,
	faLink,
	faTrash,
	faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow, { DIRECTION } from 'react-arrows';
import './Home.scss';
import web from 'modules/web';
import cookies from 'modules/cookies';

class Home extends Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentDidMount() {
		const links = await web.getLinks({
			email: cookies.get('email'),
			password: cookies.get('password'),
		});

		this.setState({
			links,
			loaded: true,
		});
	}

	render() {
		const links = this.state.links;

		if (links?.length === 0 || !links) {
			this.shortenLinkRef = createRef();
			this.emptyLabelRef = createRef();
			this.beginRef = createRef();
		}

		return (
			this.state.loaded && (
				<>
					<div className='header'>
						<Link to='/shorten'>
							<div
								ref={this.shortenLinkRef}
								className='shorten-link-button'>
								<Button icon={faPlus} label='Shorten Link' />
							</div>
						</Link>
						<Link to='/settings'>
							<Button
								className='shorten-link-button'
								icon={faUser}
								circle
								secondary
							/>
						</Link>
					</div>
					<div className='home'>
						<div className='home-middle center'>
							{links?.length === 0 || !links ? (
								<>
									<h1
										className='empty-links-label'
										ref={this.emptyLabelRef}>
										You haven't shortened any links yet!
									</h1>
									<Link to='/shorten'>
										<div
											ref={this.beginRef}
											className='begin-button'>
											<Button
												icon={faLink}
												label='Begin'
												round
												cta
											/>
										</div>
									</Link>
									<Arrow
										className='arrow'
										from={{
											direction: DIRECTION.LEFT,
											node: () =>
												this.emptyLabelRef.current,
											translation: [-1, 0],
										}}
										to={{
											direction: DIRECTION.BOTTOM,
											node: () =>
												this.shortenLinkRef.current,
											translation: [0, 1],
										}}
									/>
									<Arrow
										className='arrow'
										from={{
											direction: DIRECTION.BOTTOM,
											node: () =>
												this.emptyLabelRef.current,
											translation: [0, 1],
										}}
										to={{
											direction: DIRECTION.TOP,
											node: () => this.beginRef.current,
											translation: [0, -1],
										}}
									/>
								</>
							) : (
								links.map((link, index) => {
									const startRef = createRef();
									const endRef = createRef();

									let from = link.fromURL
										.replace('https://', '')
										.replace('http://', '')
										.replace('www.', ''); // I could just use regex I know
									from =
										from.length > 26
											? from.substring(0, 26) + '...'
											: from;

									let to = link.toURL
										.replace('https://', '')
										.replace('http://', '')
										.replace('www.', '');
									to =
										to.length > 26
											? to.substring(0, 26) + '...'
											: to;

									return (
										<div
											className='shortened-link'
											key={index}>
											<a href={link.fromURL}>
												<span
													className='shortened-link-link shortened-link-from'
													ref={startRef}>
													{from}
												</span>
											</a>
											<a href={link.toURL}>
												<span
													className='shortened-link-link shortened-link-to'
													ref={endRef}>
													{to}
												</span>
											</a>
											<div className='shortened-link-controls'>
												<FontAwesomeIcon
													icon={faTrash}
													className='remove-shortened-link'
												/>
												<FontAwesomeIcon
													icon={faEdit}
													className='edit-shortened-link'
												/>
											</div>
											<Arrow
												className='arrow'
												from={{
													direction: DIRECTION.RIGHT,
													node: () =>
														startRef.current,
													translation: [2, 0],
												}}
												to={{
													direction: DIRECTION.LEFT,
													node: () => endRef.current,
													translation: [-2, 0],
												}}
											/>
										</div>
									);
								})
							)}
						</div>
					</div>
				</>
			)
		);
	}
}

export default Home;
