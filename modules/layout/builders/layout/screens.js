const shouldCreateXsScreen = (firstBreakpoint) => firstBreakpoint.min > 0;

const buildXsScreen = (firstBreakpoint) => ({
	name: {
		primary: 'xs',
		secondary: firstBreakpoint.name.secondary,
	},
	min: 0,
	max: firstBreakpoint.min - 1,
	fluid: false,
	contentWidth: null,
	containerGutter: firstBreakpoint.containerGutter,
});

const buildBreakpointScreen = (breakpoint, nextBreakpoint) => ({
	name: breakpoint.name,
	min: breakpoint.min,
	max: nextBreakpoint ? nextBreakpoint.min - 1 : null,
	columns: breakpoint.columns,
	contentWidth: breakpoint.contentWidth,
	fluid: breakpoint.fluid,
	containerGutter: breakpoint.containerGutter,
});

const buildScreens = (resolvedBreakpoints) => {
	const xsScreen = shouldCreateXsScreen(resolvedBreakpoints[0])
		? [buildXsScreen(resolvedBreakpoints[0])]
		: [];

	const breakpointScreens = resolvedBreakpoints.map((breakpoint, index) =>
		buildBreakpointScreen(breakpoint, resolvedBreakpoints[index + 1] ?? null),
	);

	return [...xsScreen, ...breakpointScreens];
};

const isValidScreenRange = (screen) => screen.max === null || screen.max >= screen.min;

export { buildScreens, isValidScreenRange };
