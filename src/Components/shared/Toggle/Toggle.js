import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Toggle.scss';

class Toggle extends Component {
	constructor({ enabled }) {
		super();

		this.state = {
			enabled: enabled,
		};
	}

	render() {
		return (
			<div
				className='toggle'
				onClick={() => this.setState({ enabled: !this.state.enabled })}>
				<FontAwesomeIcon
					className={`toggle-icon ${
						this.state.enabled && 'toggle-icon-enabled'
					}`}
					icon={
						this.state.enabled
							? this.props.enabledIcon
							: this.props.disabledIcon
					}
				/>

				<div
					className={`toggle-switch ${
						this.state.enabled
							? 'toggle-switch-enabled'
							: 'toggle-switch-disabled'
					}`}
				/>
			</div>
		);
	}
}

export default Toggle;
