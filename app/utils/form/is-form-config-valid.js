const formConfig = {
	id: 'string',
	name: 'string',
	fieldsets: [],
	submit: {
		cta: 'string',
		success: {
			message: 'string',
			resetText: 'string | null (optional)',
		},
		error: {
			message: 'string',
			resetText: 'string | null (optional)',
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
		form.submit?.error?.message,
	);

	if (!valid) console.warn('[FormHandler] `form` must match:', formConfig);

	return valid;
};

export { isFormConfigValid };
