import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import PopUp from './PopUp';

export default {
	title: 'PopUp',
	component: PopUp,
};

const Template = (args) => <PopUp {...args} />;

export const Default = Template.bind({});
Default.args = {
	message: 'Message',
};

export const Icon = Template.bind({});
Icon.args = {
	...Default.args,
	icon: faTrash,
};

export const Buttons = Template.bind({});
Buttons.args = {
	...Default.args,
	children: (
		<>
			<Button label='Button 1' cta />
			<Button label='Button 2' />
		</>
	),
};
