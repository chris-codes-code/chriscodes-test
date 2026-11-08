import { linkModel } from './link.js';

const telURL = (phone) => (typeof phone === 'string' ? `tel:${phone.replace(/\s/g, '')}` : null);

const telLinkModel = (phone, clickedFrom = null) =>
	phone
		? linkModel({
				clickedFrom,
				label: `Call ${phone}`,
				target: '_self',
				text: phone,
				type: 'external',
				url: telURL(phone),
			})
		: null;

export { telLinkModel };
