import { config } from './config.js';
import { assignFluidBaseSecondary, resolveBreakpoints } from './builders/layout/breakpoints.js';
import { buildScreens, isValidScreenRange } from './builders/layout/screens.js';
import { buildSecondaryGroups } from './builders/layout/secondary-groups.js';
import { normaliseLength } from './builders/layout/length.js';

const getLayout = (options = config) => {
	const resolvedBreakpoints = resolveBreakpoints(options);

	assignFluidBaseSecondary(resolvedBreakpoints, options.breakpoints);

	const mediaScreens = buildScreens(resolvedBreakpoints);
	const screens = mediaScreens.filter(isValidScreenRange);
	const secondaryGroups = buildSecondaryGroups(mediaScreens);
	const baseBreakpoint = resolvedBreakpoints[0];

	return {
		gridColor: options.gridColor ?? 'orange',
		containerMode: options.containerMode ?? 'fluid',
		columnsGapX: baseBreakpoint.columnsGapX,
		columnsGapY: baseBreakpoint.columnsGapY,
		containerGutter: baseBreakpoint.containerGutter,
		breakpoints: resolvedBreakpoints,
		screens,
		secondaryGroups,
		mediaScreens,
	};
};

export { config, getLayout, normaliseLength };
