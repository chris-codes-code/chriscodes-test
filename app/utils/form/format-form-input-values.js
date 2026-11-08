import { toRaw } from 'vue';

const formatFormInputValues = (fieldsets) =>
	toRaw(fieldsets)
		.reduce((acc, { inputs }) => {
			return [...acc, inputs];
		}, [])
		.flat()
		.reduce((acc, { name, value }) => {
			return {
				...acc,
				[name]: value,
			};
		}, {});

export { formatFormInputValues };
