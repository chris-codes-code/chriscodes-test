import xss from 'xss';

const ALLOWED_ATTR = ['href', 'target', 'rel', 'class', 'colspan', 'rowspan'];

const whiteList = Object.fromEntries(
	[
		'a',
		'blockquote',
		'br',
		'div',
		'em',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'hr',
		'li',
		'ol',
		'p',
		'span',
		'strong',
		'table',
		'tbody',
		'td',
		'th',
		'thead',
		'tr',
		'ul',
	].map((tag) => [tag, ALLOWED_ATTR]),
);

const sanitiser = new xss.FilterXSS({
	whiteList,
	stripIgnoreTag: true,
	stripIgnoreTagBody: ['script', 'style'],
});

const sanitiseText = (text) => {
	if (typeof text !== 'string') return text ?? null;

	const sanitised = sanitiser.process(text).trim();

	return sanitised || null;
};

export { sanitiseText };
