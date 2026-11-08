const formConfig = {
	id: 'string',
	name: 'string',
	fieldsets: [],
	submit: {
		cta: 'string',
		success: {
			message: 'string',
			resetText: 'string',
		},
		error: {
			message: 'string',
			resetText: 'string',
		},
	},
};

const isFormConfigValid = (form) => {
	const valid = Boolean(
		form?.id &&
		form?.name &&
		Array.isArray(form.fieldsets) &&
		form.submit?.cta &&
		form.submit?.success?.message &&
		form.submit?.success?.resetText &&
		form.submit?.error?.message &&
		form.submit?.error?.resetText,
	);

	if (!valid) console.warn('[FormHandler] `form` must match:', formConfig);

	return valid;
};

export { isFormConfigValid };
