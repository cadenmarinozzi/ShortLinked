import Input from './Input';

export default {
	title: 'Input',
	component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Input',
	placeholder: 'placeholder',
};

export const Password = Template.bind({});
Password.args = {
	...Default.args,
	type: 'password',
};

export const Required = Template.bind({});
Required.args = {
	...Default.args,
	required: true,
};

export const Error = Template.bind({});
Error.args = {
	...Default.args,
	error: 'Error',
};

export const Tooltip = Template.bind({});
Tooltip.args = {
	...Default.args,
	tooltip: 'Tooltip',
};

export const Disabled = Template.bind({});
Disabled.args = {
	...Default.args,
	disabled: true,
};

export const Validate = Template.bind({});
Validate.args = {
	...Default.args,
	validate: (value) => {
		return value.length > 5;
	},
};
