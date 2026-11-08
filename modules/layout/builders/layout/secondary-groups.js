const hasSecondaryName = (screen) => Boolean(screen.name.secondary);

const isSameSecondaryGroup = (group, secondaryName) => group?.secondary === secondaryName;

const buildSecondaryGroups = (screens) => {
	const secondaryGroups = [];

	for (const screen of screens) {
		if (!hasSecondaryName(screen)) continue;

		const secondaryName = screen.name.secondary;
		const currentGroup = secondaryGroups[secondaryGroups.length - 1];

		if (isSameSecondaryGroup(currentGroup, secondaryName)) {
			currentGroup.screens.push(screen);
			continue;
		}

		secondaryGroups.push({ secondary: secondaryName, screens: [screen] });
	}

	return secondaryGroups;
};

export { buildSecondaryGroups };
