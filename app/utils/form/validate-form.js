import { getInputErrorMessage } from './get-input-error-message';

const validateForm = (fieldsets) => {
	fieldsets.forEach((fieldset) => {
		fieldset.inputs.forEach((input) => {
			input.errorMessage = getInputErrorMessage(input);
		});
	});
};

export { validateForm };
