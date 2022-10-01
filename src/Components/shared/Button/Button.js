import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

class Button extends Component {
	render() {
		let { label, icon, cta, circle, round, secondary, className, ...rest } =
			this.props;

		return (
			<button
				className={`button ${className} ${circle && 'button-circle'} ${
					round && 'button-round'
				} button-${cta ? 'cta' : secondary ? 'secondary' : 'default'}`}
				{...rest}>
				{icon && <FontAwesomeIcon icon={icon} />}
				{label}
			</button>
		);
	}
}

export default Button;
