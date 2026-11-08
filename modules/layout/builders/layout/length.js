/** Turn a '10px' or '10vw' string into { value, unit, css }. */
const normaliseLength = (value) => {
	const match = String(value)
		.trim()
		.match(/^(-?[\d.]+)(px|vw)$/i);

	if (!match) {
		throw new Error(`Invalid length "${value}". Use a string with a unit, e.g. '10px' or '10vw'.`);
	}

	return {
		value: Number(match[1]),
		unit: match[2].toLowerCase(),
		css: `${match[1]}${match[2].toLowerCase()}`,
	};
};

export { normaliseLength };
