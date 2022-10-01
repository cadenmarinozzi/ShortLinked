import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PopUp.scss';

function PopUp({ message, icon, className, children, ...rest }) {
	return (
		<div className='popup-container'>
			<div className={`popup center ${className}`} {...rest}>
				<div className='popup-message'>
					{icon && (
						<FontAwesomeIcon
							className='popup-icon fa-lg'
							icon={icon}
						/>
					)}{' '}
					{message}
				</div>
				<div className='popup-buttons'>{children}</div>
			</div>
		</div>
	);
}

export default PopUp;
