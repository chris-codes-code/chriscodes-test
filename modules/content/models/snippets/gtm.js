export const gtmModel = {
	event: {
		click: ({ clicked_from, type, category, label, url }) => ({
			type,
			category,
			label,
			clicked_from,
			url,
		}),
	},
};
