import { getInputErrorMessage } from './get-input-error-message';

const updateFormInput = (fieldsets, name, value, opts = {}, submissionCount = 0) => {
	for (const fieldset of fieldsets) {
		if (!fieldset.inputs) continue;

		const input = fieldset.inputs.find((input) => input.name === name);

		if (input) {
			input.value = value;

			if (opts.validate || submissionCount > 0) input.errorMessage = getInputErrorMessage(input);

			break;
		}
	}
};

export { updateFormInput };
