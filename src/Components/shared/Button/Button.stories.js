import Button from './Button';

export default {
	title: 'Button',
	component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Button',
};

export const CTA = Template.bind({});
CTA.args = {
	...Default.args,
	cta: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
	...Default.args,
	secondary: true,
};

export const Circle = Template.bind({});
Circle.args = {
	label: 'x',
	circle: true,
};

export const Round = Template.bind({});
Round.args = {
	...Default.args,
	round: true,
};
