import { Bezier } from 'bezier-js';

function quadraticBezier(...points) {
	return new Bezier([...points]);
}

function calculatePasswordStrength(password) {
	if (password.length < 8) {
		return 'weak';
	}

	if (password.length < 12) {
		return 'good';
	}

	return 'strong';
}

export { quadraticBezier, calculatePasswordStrength };
