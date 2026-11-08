import { linkModel } from './link.js';

const mailtoURL = (email) => (typeof email === 'string' ? `mailto:${email.replace(/\s/g, '')}` : null);

const mailtoLinkModel = (email, clickedFrom = null) =>
	email
		? linkModel({
				clickedFrom,
				label: `Email ${email}`,
				target: '_self',
				text: email,
				type: 'external',
				url: mailtoURL(email),
			})
		: null;

export { mailtoLinkModel };
