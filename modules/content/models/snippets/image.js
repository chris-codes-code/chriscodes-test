const getAttrs = ({ alt, focus, height, url, width } = {}) => ({
	alt,
	focus: {
		x: focus?.x || 50,
		y: focus?.y || 50,
	},
	height,
	url,
	width,
});

const imageModel = (image) => {
	const { alt, focus, height, url, width } = getAttrs(image);

	return {
		alt,
		height,
		objectPosition: `${focus.x}% ${focus.y}%`,
		src: url,
		width,
	};
};

export { imageModel };
