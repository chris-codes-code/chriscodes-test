import { normaliseLayoutTokens, overrideLayoutTokens } from './layout-tokens.js';
import { normaliseLength } from './length.js';

const hasFixedContentWidth = (breakpoint) => breakpoint.contentWidth !== undefined && breakpoint.contentWidth !== null;
const omitsContentWidth = (breakpoint) => !hasFixedContentWidth(breakpoint);
const hasAnyFixedContentWidth = (breakpoints) => breakpoints.some(hasFixedContentWidth);

const assertBreakpointsHaveContentWidth = (breakpoints) => {
	if (!hasAnyFixedContentWidth(breakpoints)) {
		throw new Error('At least one breakpoint needs a contentWidth');
	}
};

/** contentWidth is always px in the resolved layout. */
const resolveContentWidthPx = (contentWidth) => {
	const length = normaliseLength(contentWidth);

	if (length.unit !== 'px') {
		throw new Error(`contentWidth must use px (got ${length.css})`);
	}

	return length.value;
};

/** Viewport min-width where contentWidth + gutters on both sides still fit. */
const resolveBreakpointMin = (contentWidth, gutter) => {
	if (gutter.unit === 'px') {
		return contentWidth + gutter.value * 2;
	}

	const gutterFractionOfViewport = (gutter.value * 2) / 100;

	if (gutterFractionOfViewport >= 1) {
		throw new Error(`containerGutter ${gutter.css} is too large to resolve breakpoints`);
	}

	return Math.ceil(contentWidth / (1 - gutterFractionOfViewport));
};

const isFluidMiddleBreakpoint = (isFluid, isFirst, isLast) => isFluid && !isFirst && !isLast;
const isFluidBaseBreakpoint = (isFluid, isFirst) => isFluid && isFirst;
const isFluidMaxBreakpoint = (isFluid, isLast) => isFluid && isLast;

/** Fixed vs fluid content sizing for one breakpoint. */
const resolveBreakpointSizing = ({
	breakpoint,
	isFirst,
	isLast,
	previousBreakpoint,
	containerGutter,
}) => {
	const isFluid = omitsContentWidth(breakpoint);

	if (isFluidMiddleBreakpoint(isFluid, isFirst, isLast)) {
		throw new Error('Only the first or last breakpoint can omit contentWidth');
	}

	if (isFluidBaseBreakpoint(isFluid, isFirst)) {
		return { contentWidth: null, fluid: true, fluidFrom: null, min: 0 };
	}

	if (isFluidMaxBreakpoint(isFluid, isLast)) {
		if (omitsContentWidth(previousBreakpoint)) {
			throw new Error('Fluid max needs a previous breakpoint with contentWidth');
		}

		return {
			contentWidth: null,
			fluid: true,
			fluidFrom: previousBreakpoint.contentWidth,
			min: previousBreakpoint.min,
		};
	}

	const contentWidth = resolveContentWidthPx(breakpoint.contentWidth);

	return {
		contentWidth,
		fluid: false,
		fluidFrom: null,
		min: resolveBreakpointMin(contentWidth, containerGutter),
	};
};

const resolveBreakpoints = (options) => {
	const { breakpoints } = options;

	assertBreakpointsHaveContentWidth(breakpoints);

	const layoutTokens = normaliseLayoutTokens(options, breakpoints[0]);
	const resolvedBreakpoints = [];

	for (let index = 0; index < breakpoints.length; index += 1) {
		const breakpoint = breakpoints[index];
		const isFirst = index === 0;
		const isLast = index === breakpoints.length - 1;
		const previousBreakpoint = isFirst ? null : resolvedBreakpoints[index - 1];

		overrideLayoutTokens(layoutTokens, breakpoint);

		const sizing = resolveBreakpointSizing({
			breakpoint,
			isFirst,
			isLast,
			previousBreakpoint,
			containerGutter: layoutTokens.containerGutter,
		});

		resolvedBreakpoints.push({
			name: {
				primary: breakpoint.name.primary,
				secondary: layoutTokens.secondaryName,
			},
			columns: breakpoint.columns,
			columnsGapX: layoutTokens.columnsGapX,
			columnsGapY: layoutTokens.columnsGapY,
			containerGutter: layoutTokens.containerGutter,
			...sizing,
		});
	}

	return resolvedBreakpoints;
};

const findFirstDeclaredSecondary = (configuredBreakpoints) =>
	configuredBreakpoints.find((breakpoint) => breakpoint.name.secondary)?.name.secondary;

const isFluidBaseWithoutSecondary = (baseBreakpoint) =>
	baseBreakpoint.min === 0 && !baseBreakpoint.name.secondary;

/** Fluid base (min: 0) inherits the first declared secondary group, e.g. mobile. */
const assignFluidBaseSecondary = (resolvedBreakpoints, configuredBreakpoints) => {
	const firstDeclaredSecondary = findFirstDeclaredSecondary(configuredBreakpoints);
	const baseBreakpoint = resolvedBreakpoints[0];

	if (firstDeclaredSecondary && isFluidBaseWithoutSecondary(baseBreakpoint)) {
		baseBreakpoint.name.secondary = firstDeclaredSecondary;
	}
};

export { assignFluidBaseSecondary, resolveBreakpoints };
