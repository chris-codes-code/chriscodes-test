import { GENERATED_FILE_HEADER, px } from './css-utils.js';

const hasScreenMax = (screen) => screen.max !== null;

const buildPrimaryScreenMediaQueries = (screen) => {
	const { primary } = screen.name;
	const lines = [`@custom-media --screen-${primary}-min (min-width: ${px(screen.min)});`];

	if (hasScreenMax(screen)) {
		lines.push(`@custom-media --screen-${primary}-max (max-width: ${px(screen.max)});`);
		lines.push(
			`@custom-media --screen-${primary} (min-width: ${px(screen.min)}) and (max-width: ${px(screen.max)});`,
		);
	} else {
		lines.push(`@custom-media --screen-${primary} (min-width: ${px(screen.min)});`);
	}

	lines.push('');

	return lines;
};

const isFirstSecondaryGroup = (index) => index === 0;
const isLastSecondaryGroup = (index, groups) => index === groups.length - 1;

const buildSecondaryGroupMediaQueries = (group, index, secondaryGroups) => {
	const first = group.screens[0];
	const last = group.screens[group.screens.length - 1];
	const name = group.secondary;
	const lines = [];

	if (isLastSecondaryGroup(index, secondaryGroups)) {
		lines.push(`@custom-media --screen-${name} (--screen-${first.name.primary}-min);`);
	} else if (isFirstSecondaryGroup(index)) {
		lines.push(`@custom-media --screen-${name} (--screen-${last.name.primary}-max);`);
		lines.push(`@custom-media --screen-${name}-max (--screen-${last.name.primary}-max);`);
	} else {
		lines.push(`@custom-media --screen-${name}-min (--screen-${first.name.primary}-min);`);
		lines.push(
			`@custom-media --screen-${name} (--screen-${first.name.primary}-min) and (--screen-${last.name.primary}-max);`,
		);
		lines.push(`@custom-media --screen-${name}-max (--screen-${last.name.primary}-max);`);
	}

	lines.push('');

	return lines;
};

const buildMediaQueriesCss = (layout) => {
	const { mediaScreens, secondaryGroups } = layout;
	const lines = [GENERATED_FILE_HEADER, ''];

	for (const screen of mediaScreens) {
		lines.push(...buildPrimaryScreenMediaQueries(screen));
	}

	secondaryGroups.forEach((group, index) => {
		lines.push(...buildSecondaryGroupMediaQueries(group, index, secondaryGroups));
	});

	return lines.join('\n');
};

export { buildMediaQueriesCss };
