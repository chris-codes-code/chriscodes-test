const isFormValid = (fieldsets) =>
	fieldsets.flatMap((fieldset) => fieldset.inputs).every((input) => !input.errorMessage);

export { isFormValid };
