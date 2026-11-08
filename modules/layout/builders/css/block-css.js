import { GENERATED_FILE_HEADER, getMaxContainerWidthPx, px, toCappedLengthCss, toFluidLengthCss } from './css-utils.js';

const isFluidFromPrevious = (breakpoint) =>
	breakpoint.fluid && breakpoint.fluidFrom !== undefined && breakpoint.fluidFrom !== null;
const isFluidBase = (breakpoint) => breakpoint.fluid;
const lastBreakpointIsNamedMax = (breakpoints) => breakpoints[breakpoints.length - 1].name.primary === 'max';

const getMaxContentWidth = (breakpoints) =>
	[...breakpoints]
		.reverse()
		.find((breakpoint) => breakpoint.contentWidth !== undefined && breakpoint.contentWidth !== null)?.contentWidth;

const getGutterAtMaxContent = (breakpoints) =>
	[...breakpoints]
		.reverse()
		.find((breakpoint) => breakpoint.contentWidth !== undefined && breakpoint.contentWidth !== null)?.containerGutter;

const getContentWidthCssValue = (breakpoint) => {
	if (isFluidFromPrevious(breakpoint)) {
		return `max(${px(breakpoint.fluidFrom)}, calc(100vw - var(--container-gutter) * 2))`;
	}

	if (isFluidBase(breakpoint)) {
		return 'calc(100vw - var(--container-gutter) * 2)';
	}

	return px(breakpoint.contentWidth);
};

const isShadowedByFluidBreakpoint = (breakpoint, breakpoints) =>
	breakpoints.find((other) => other.fluid && other.min === breakpoint.min && other !== breakpoint) !== undefined;

const isBaseViewportBreakpoint = (breakpoint) => breakpoint.min === 0;

const hasChangedColumns = (breakpoint, previous) => !previous || breakpoint.columns !== previous.columns;

const hasChangedGapX = (breakpoint, previous) => !previous || breakpoint.columnsGapX.css !== previous.columnsGapX.css;

const hasChangedGapY = (breakpoint, previous) => !previous || breakpoint.columnsGapY.css !== previous.columnsGapY.css;

const hasChangedGutter = (breakpoint, previous) =>
	!previous || breakpoint.containerGutter.css !== previous.containerGutter.css;

const buildLengthTokenLines = (name, length, indent = '\t\t') => [
	`${indent}--${name}-fluid: ${toFluidLengthCss(length)};`,
	`${indent}--${name}: ${toCappedLengthCss(length)};`,
];

const buildBreakpointOverrideLines = (breakpoint, previous) => {
	const { primary } = breakpoint.name;
	const changedColumns = hasChangedColumns(breakpoint, previous);
	const changedGapX = hasChangedGapX(breakpoint, previous);
	const changedGapY = hasChangedGapY(breakpoint, previous);
	const changedGutter = hasChangedGutter(breakpoint, previous);
	const lines = [`\t@media (--screen-${primary}-min) {`, `\t\t--content-width: var(--content-width-${primary});`];

	if (changedColumns) {
		lines.push(`\t\t--columns: ${breakpoint.columns};`);
	}

	if (changedGapX || changedGapY || changedGutter) {
		if (changedColumns) lines.push('');
		if (changedGapX) lines.push(...buildLengthTokenLines('columns-gap-x', breakpoint.columnsGapX));
		if (changedGapY) lines.push(...buildLengthTokenLines('columns-gap-y', breakpoint.columnsGapY));
		if (changedGutter) {
			lines.push(...buildLengthTokenLines('container-gutter', breakpoint.containerGutter));
		}
	}

	lines.push('\t}', '');

	return lines;
};

const buildBlockCss = (layout) => {
	const { breakpoints } = layout;
	const base = breakpoints[0];

	const lines = [
		GENERATED_FILE_HEADER,
		'',
		"@import './media-queries.css';",
		'',
		':root {',
		...breakpoints.map(
			(breakpoint) => `\t--content-width-${breakpoint.name.primary}: ${getContentWidthCssValue(breakpoint)};`,
		),
		...(lastBreakpointIsNamedMax(breakpoints)
			? []
			: [`\t--content-width-max: var(--content-width-${breakpoints[breakpoints.length - 1].name.primary});`]),
		'',
		`\t--content-width: var(--content-width-${base.name.primary});`,
		'',
		`\t--container-width-max: ${px(getMaxContainerWidthPx(getMaxContentWidth(breakpoints), getGutterAtMaxContent(breakpoints)))};`,
		...buildLengthTokenLines('container-gutter', base.containerGutter, '\t'),
		'\t--container-width: calc(var(--content-width) + var(--container-gutter) * 2);',
		'',
		`\t--columns: ${base.columns};`,
		...buildLengthTokenLines('columns-gap-x', base.columnsGapX, '\t'),
		...buildLengthTokenLines('columns-gap-y', base.columnsGapY, '\t'),
		'\t--column-width: calc((var(--content-width) - (var(--columns) - 1) * var(--columns-gap-x)) / var(--columns));',
		'',
	];

	for (let index = 0; index < breakpoints.length; index += 1) {
		const breakpoint = breakpoints[index];
		const previous = index > 0 ? breakpoints[index - 1] : null;

		if (isShadowedByFluidBreakpoint(breakpoint, breakpoints)) continue;
		if (isBaseViewportBreakpoint(breakpoint)) continue;

		lines.push(...buildBreakpointOverrideLines(breakpoint, previous));
	}

	if (lines.at(-1) === '') lines.pop();

	lines.push('}', '');

	return lines.join('\n');
};

export { buildBlockCss };
