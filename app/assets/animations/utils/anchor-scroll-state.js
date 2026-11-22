let isAnchorScrolling = false;
const listeners = new Set();

const getIsAnchorScrolling = () => isAnchorScrolling;

const setIsAnchorScrolling = (value) => {
	isAnchorScrolling = Boolean(value);
	listeners.forEach((listener) => listener(isAnchorScrolling));
};

const onAnchorScrollingChange = (listener) => {
	listeners.add(listener);

	return () => listeners.delete(listener);
};

export { getIsAnchorScrolling, onAnchorScrollingChange, setIsAnchorScrolling };
