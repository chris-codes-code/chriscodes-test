import { toRaw } from 'vue';
import { config } from './config';

const { honeypotInput } = config;

const getInputValue = (input) => {
	if (input.type === 'checkbox' && input.options?.length) return input.value || [];
	if (input.type === 'consent') return Boolean(input.value);
	if (input.type === 'select' && input.options?.length) {
		return input.value || input.options[0]?.value || '';
	}

	return input.value || '';
};

const getInputs = (inputs) => {
	return inputs.map((input) => ({
		...input,
		errorMessage: null,
		value: getInputValue(input),
	}));
};

const getFormFieldsets = (fieldsets) => {
	const clonedFieldsets = [
		...structuredClone(toRaw(fieldsets)),
		{
			id: honeypotInput.name,
			inputs: [
				{
					autocomplete: 'off',
					honeypot: true,
					label: honeypotInput.label,
					name: honeypotInput.name,
					required: false,
					tabindex: '-1',
					type: 'text',
				},
			],
			legend: null,
		},
	];

	return clonedFieldsets.map((fieldset) => {
		return {
			...fieldset,
			inputs: getInputs(fieldset.inputs),
		};
	});
};

export { getFormFieldsets };
