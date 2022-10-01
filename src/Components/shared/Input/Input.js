import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { calculatePasswordStrength } from 'modules/utils';
import './Input.scss';

class Input extends Component {
	constructor({ enabled, error }) {
		super();
		this.id = uuid();

		this.state = {
			enabled: enabled ?? true,
			error: error,
		};
	}

	render() {
		let {
			label,
			className,
			required,
			tooltip,
			buttonIcon,
			disabledButtonIcon,
			enabledButtonIcon,
			onChange,
			validate,
			onButtonIconClick,
			...rest
		} = this.props;

		return (
			<>
				<div
					className={`input-container ${
						this.state.error && 'input-error'
					} ${className}`}>
					{tooltip && (
						<>
							<FontAwesomeIcon
								className='input-tooltip'
								icon={faQuestionCircle}
							/>
							<div className='input-tooltip-container'>
								{tooltip}
							</div>
						</>
					)}
					<label
						htmlFor={this.id}
						className={`input-label input-label-${
							this.state.enabled ? 'enabled' : 'disabled'
						}`}>
						{label}
						{required && <span className='input-required'>*</span>}
						<div className='input-label-line-container'>
							<div className='input-label-line'></div>
						</div>
					</label>
					<input
						className='input'
						type='text'
						id={this.id}
						onChange={(e) => {
							const value = e.target.value;

							this.setState({
								error: validate && !validate(e.target.value),
								value: e.target.value,
								passwordStrength:
									this.props.type === 'password' &&
									calculatePasswordStrength(value),
							});

							if (this.state.enabled) {
								if (onChange) {
									onChange(value);
								}

								return;
							}

							this.setState({ enabled: true });
						}}
						{...rest}
					/>
					{this.props.type === 'password' && this.state.value && (
						<div
							className={`password-meter meter-${this.state.passwordStrength}`}>
							{this.state.passwordStrength}
						</div>
					)}
					{buttonIcon && (
						<FontAwesomeIcon
							className='input-button-icon'
							icon={buttonIcon}
							onClick={onButtonIconClick}
						/>
					)}
					{disabledButtonIcon && !this.state.enabled && (
						<FontAwesomeIcon
							onClick={() => this.setState({ enabled: true })}
							className='input-button-icon input-button-icon-disabled'
							icon={disabledButtonIcon}
						/>
					)}
					{enabledButtonIcon && this.state.enabled && (
						<FontAwesomeIcon
							onClick={() => this.setState({ enabled: false })}
							className='input-button-icon input-button-icon-enabled'
							icon={enabledButtonIcon}
						/>
					)}
				</div>
				{this.props.type === 'password' && this.state.value && (
					<div className='password-strength'>
						<div
							className={`password-strength-bar password-${this.state.passwordStrength}`}
						/>
					</div>
				)}
			</>
		);
	}
}

export default Input;
