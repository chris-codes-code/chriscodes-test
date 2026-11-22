let lenisInstance = null;

const setLenis = (instance) => {
	lenisInstance = instance;
};

const getLenis = () => lenisInstance;

export { getLenis, setLenis };
