import { normaliseLength } from './length.js';

/** Starting gaps, gutter, and secondary name from top-level config. */
const normaliseLayoutTokens = (options, firstBreakpoint) => ({
	secondaryName: firstBreakpoint.name.secondary,
	columnsGapX: normaliseLength(options.columnsGapX),
	columnsGapY: normaliseLength(options.columnsGapY),
	containerGutter: normaliseLength(options.containerGutter),
});

const hasSecondaryName = (breakpoint) => Boolean(breakpoint.name.secondary);
const hasColumnsGapXOverride = (breakpoint) => breakpoint.columnsGapX !== undefined && breakpoint.columnsGapX !== null;
const hasColumnsGapYOverride = (breakpoint) => breakpoint.columnsGapY !== undefined && breakpoint.columnsGapY !== null;
const hasContainerGutterOverride = (breakpoint) =>
	breakpoint.containerGutter !== undefined && breakpoint.containerGutter !== null;

/** Cascade any per-breakpoint gap / gutter / secondary overrides onto layout tokens. */
const overrideLayoutTokens = (layoutTokens, breakpoint) => {
	if (hasSecondaryName(breakpoint)) {
		layoutTokens.secondaryName = breakpoint.name.secondary;
	}

	if (hasColumnsGapXOverride(breakpoint)) {
		layoutTokens.columnsGapX = normaliseLength(breakpoint.columnsGapX);
	}

	if (hasColumnsGapYOverride(breakpoint)) {
		layoutTokens.columnsGapY = normaliseLength(breakpoint.columnsGapY);
	}

	if (hasContainerGutterOverride(breakpoint)) {
		layoutTokens.containerGutter = normaliseLength(breakpoint.containerGutter);
	}
};

export { normaliseLayoutTokens, overrideLayoutTokens };
