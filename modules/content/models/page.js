import { heroModel } from './components/hero.js';
import { getContentModel } from './components/content/index.js';
import { seoModel } from './seo.js';

const getAttrs = (page) => ({
	title: page?.title || null,
	hero: page?.hero || null,
	content: page?.content || [],
	seo: page?.seo || null,
});

const getPageModel = (page) => {
	const { title, hero, content, seo } = getAttrs(page);

	return {
		title,
		hero: hero ? heroModel(hero) : null,
		content: content ? getContentModel(content) : null,
		seo: seoModel(seo),
	};
};

export { getPageModel };
