const buildImageScreens = (breakpoints) => {
	const screens = {};

	for (const breakpoint of breakpoints) {
		if (breakpoint.min > 0) {
			screens[breakpoint.name.primary] = breakpoint.min;
		}
	}

	const contentWidths = breakpoints
		.map((breakpoint) => breakpoint.contentWidth)
		.filter((width) => typeof width === 'number');

	const sizes = new Set();

	for (const width of contentWidths) {
		sizes.add(width);
		sizes.add(width * 2);
	}

	for (const size of [...sizes].sort((a, b) => a - b)) {
		screens[size] = size;
	}

	return screens;
};

const buildClientConfig = (layout) => {
	const breakpoints = layout.breakpoints.map((breakpoint) => ({
		name: breakpoint.name,
		min: breakpoint.min,
		columns: breakpoint.columns,
		contentWidth: breakpoint.contentWidth,
		fluid: breakpoint.fluid,
	}));

	const screens = layout.screens.map((screen) => ({
		name: screen.name,
		min: screen.min,
		max: screen.max,
	}));

	return {
		gridColor: layout.gridColor,
		containerMode: layout.containerMode,
		breakpoints,
		screens,
		imageScreens: buildImageScreens(breakpoints),
	};
};

const buildClientConfigJson = (layout) => `${JSON.stringify(buildClientConfig(layout), null, '\t')}\n`;

export { buildClientConfig, buildClientConfigJson };
