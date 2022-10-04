import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Toggle from './Toggle';

export default {
	title: 'Toggle',
	component: Toggle,
};

const Template = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Toggle',
	enabledIcon: faCheck,
	disabledIcon: faTimes,
};

export const Enabled = Template.bind({});
Enabled.args = {
	...Default.args,
	enabled: true,
};
