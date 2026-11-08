import { sanitiseText } from '../../utils/sanitise-text.js';

const wrapTables = (html) =>
	typeof html === 'string' && html.includes('<table') && !html.includes('StyleText__table-wrapper')
		? html.replace(/(<table\b[\s\S]*?<\/table>)/gi, '<div class="StyleText__table-wrapper">$1</div>')
		: html;

const formatText = (text) => {
	const sanitised = sanitiseText(text);
	if (!sanitised) return null;

	return wrapTables(sanitised);
};

export { formatText };
