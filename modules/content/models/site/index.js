import { seoModel } from '../seo.js';
import { linkModel } from '../snippets/link.js';
import { siteNavigationModel } from './navigation.js';

const getAttrs = (site) => ({
	navigation: site?.navigation || null,
	notification: site?.notification || null,
	seo: site?.seo || null,
});

const siteNotificationModel = (notification) => {
	if (!notification?.text) return null;

	return {
		link: notification.link
			? linkModel({
					...notification.link,
					clickedFrom: 'site-notification',
				})
			: null,
		text: notification.text,
	};
};

const getSiteModel = (site) => {
	const { navigation, notification, seo } = getAttrs(site);

	return {
		navigation: {
			links: siteNavigationModel(navigation),
		},
		notification: siteNotificationModel(notification),
		seo: seoModel(seo),
	};
};

export { getSiteModel };
