const getClearedInputValue = (input) => {
	if (input.type === 'checkbox' && input.options?.length) return [];
	if (input.type === 'consent') return false;
	if (input.type === 'select' && input.options?.length) {
		return input.options[0]?.value || '';
	}

	return '';
};

const clearFormInputValues = (fieldsets) => {
	fieldsets.forEach((fieldset) => {
		fieldset.inputs.forEach((input) => {
			input.value = getClearedInputValue(input);
		});
	});
};

export { clearFormInputValues };
