import isDate from 'validator/lib/isDate';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import { config } from './config';

const { honeypotInput } = config;

const errorMessages = {
	checkbox: 'is required',
	date: 'is not valid (e.g. 01/01/2027)',
	email: 'is not valid (e.g. example@email.com)',
	required: 'is required',
	tel: 'is not valid a phone number',
	honeypot: 'has an issue',
};

const validator = {
	date: (value) => isDate(value, { delimiters: ['-'], format: 'YYYY-MM-DD', strictMode: true }),
	email: isEmail,
	tel: isNumeric,
};

const isInputTypeValueInvalid = (type, value) => {
	const isTypeValidated = Object.keys(validator).includes(type) && value;

	return isTypeValidated && !validator[type](value.replace(/\s/g, ''));
};

const isInputValueRequired = (required, value) => required && (!value || (Array.isArray(value) && !value.length));

const isInputHoneypot = (name, value) => name === honeypotInput.name && value;

const getRequiredErrorMessage = (type) => {
	if (type === 'checkbox') return errorMessages.checkbox;

	return errorMessages.required;
};

const getInputErrorMessage = ({ name, required, type, value }) => {
	let errorMessage = null;

	if (isInputTypeValueInvalid(type, value)) errorMessage = errorMessages[type];
	else if (isInputValueRequired(required, value)) errorMessage = getRequiredErrorMessage(type);
	else if (isInputHoneypot(name, value)) errorMessage = errorMessages.honeypot;

	return errorMessage;
};

export { getInputErrorMessage };
