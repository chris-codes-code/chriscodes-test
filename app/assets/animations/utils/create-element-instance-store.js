const createElementInstanceStore = () => {
	const instances = new WeakMap();

	return {
		deleteInstance: (element) => instances.delete(element),
		getInstance: (element) => instances.get(element),
		setInstance: (element, instance) => instances.set(element, instance),
	};
};

export { createElementInstanceStore };
