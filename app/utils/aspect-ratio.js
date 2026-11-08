const gcd = (left, right) => (right ? gcd(right, left % right) : left);

const getAspectRatio = (width, height, fallback = '16 / 9') => {
	const w = Math.round(width);
	const h = Math.round(height);

	if (!w || !h) return fallback;

	const divisor = gcd(w, h);

	return `${w / divisor} / ${h / divisor}`;
};

export { getAspectRatio };
