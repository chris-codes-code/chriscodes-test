import { linkModel } from '../snippets/link.js';
import { isArrayWithItems } from '../../utils/helpers.js';

const siteNavigationModel = (links) =>
	isArrayWithItems(links)
		? links.map((item) =>
				linkModel({
					...item,
					clickedFrom: 'site-navigation',
				}),
			)
		: null;

export { siteNavigationModel };
