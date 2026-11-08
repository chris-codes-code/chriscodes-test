const getFirstInputError = (fieldsets) =>
	fieldsets.flatMap((fieldset) => fieldset.inputs).find((input) => input.errorMessage);

export { getFirstInputError };
