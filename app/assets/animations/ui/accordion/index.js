import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const tweens = {
	contentClose: {
		duration: config.duration.primary,
		ease: config.ease.primary,
	},
	contentOpen: {
		duration: config.duration.secondary,
		ease: config.ease.primary,
	},
	height: {
		duration: config.duration.secondary,
		ease: config.ease.secondary,
	},
	icon: {
		duration: config.duration.secondary,
		ease: config.ease.secondary,
	},
};

const ensureInstance = (element, create) => {
	let instance = getInstance(element);

	if (!instance) {
		instance = create();
		setInstance(element, instance);
	}

	return instance;
};

const getContext = (accordion) => {
	const instance = ensureInstance(accordion, () => {
		const { gsap } = getGSAP();
		return { context: gsap.context(() => {}) };
	});

	return instance.context;
};

const getEntry = (accordion, entryIndex) => {
	const entryRoot = accordion.querySelectorAll('.UIAccordion__entry')[entryIndex];
	if (!entryRoot) return null;

	return {
		content: entryRoot.querySelector('.UIAccordion__content'),
		details: entryRoot.querySelector('.UIAccordion__details'),
		entryRoot,
		icon: entryRoot.querySelector('.UIAccordion__icon'),
		wrapper: entryRoot.querySelector('.UIAccordion__content-wrapper'),
	};
};

const getEntryInstance = (entryRoot) =>
	ensureInstance(entryRoot, () => ({ frameId: null, isOpening: null, timeline: null }));

const getPixelHeight = (gsap, element) => {
	const height = parseFloat(gsap.getProperty(element, 'height', 'px'));
	return Number.isFinite(height) ? height : null;
};

const getFullHeight = (wrapper, content) => Math.max(wrapper.scrollHeight, content.scrollHeight, content.offsetHeight);

const prepareWrapperForMeasure = ({ details, gsap, isOpening, wrapper }) => {
	if (isOpening) {
		const height = getPixelHeight(gsap, wrapper);
		if (!(height > 0)) wrapper.style.removeProperty('height');
		void details.offsetHeight;
		return;
	}

	wrapper.style.height = 'auto';
	void wrapper.offsetHeight;
};

const getStartHeight = (currentHeight, fullHeight, isOpening) => {
	if (currentHeight === null) return isOpening ? 0 : fullHeight;

	return isOpening ? Math.max(0, Math.min(currentHeight, fullHeight)) : Math.min(currentHeight, fullHeight);
};

const getStartOpacity = (opacity, isOpening) => {
	if (!Number.isFinite(opacity)) return isOpening ? 0 : 1;
	if (isOpening) return opacity < 1 ? opacity : 0;
	return opacity;
};

const animateUIAccordion = {
	init: (accordion) => {
		if (accordion) getContext(accordion);
	},

	toggle: (event, accordion, entryIndex, callbacks) => {
		event.preventDefault();

		const { gsap } = getGSAP();
		const context = getContext(accordion);
		const entry = getEntry(accordion, entryIndex);

		if (!entry?.entryRoot || !entry.details || !entry.wrapper || !entry.content) return;

		const { content, details, entryRoot, icon, wrapper } = entry;
		const instance = getEntryInstance(entryRoot);

		if (instance.frameId !== null) {
			cancelAnimationFrame(instance.frameId);
			instance.frameId = null;
		}

		instance.timeline?.kill();
		instance.timeline = null;

		const isOpening = instance.isOpening !== null ? !instance.isOpening : !details.open;
		instance.isOpening = isOpening;

		const run = () => {
			instance.frameId = null;
			if (!entryRoot.isConnected) return;
			if (instance.isOpening !== isOpening) return;

			if (isOpening) callbacks.onEnter(entryIndex);
			else callbacks.onLeave(entryIndex);

			details.open = true;
			prepareWrapperForMeasure({ details, gsap, isOpening, wrapper });

			const fullHeight = getFullHeight(wrapper, content);
			const currentHeight = getPixelHeight(gsap, wrapper);
			const startHeight = getStartHeight(currentHeight, fullHeight, isOpening);
			const startOpacity = getStartOpacity(parseFloat(gsap.getProperty(content, 'opacity')), isOpening);

			context.add(() => {
				gsap.set(wrapper, { height: startHeight });
				gsap.set(content, { opacity: startOpacity });

				const timeline = gsap.timeline({
					onComplete: () => {
						details.open = isOpening;
						instance.timeline = null;
						instance.isOpening = null;

						if (isOpening) {
							wrapper.style.height = 'auto';
							callbacks.afterEnter(entryIndex);
						} else {
							wrapper.style.removeProperty('height');
							callbacks.afterLeave(entryIndex);
						}
					},
				});

				timeline.to(wrapper, {
					height: isOpening ? fullHeight : 0,
					...tweens.height,
				});

				timeline.to(
					content,
					{
						opacity: isOpening ? 1 : 0,
						...(isOpening ? tweens.contentOpen : tweens.contentClose),
					},
					isOpening ? config.duration.primary : 0,
				);

				if (icon) {
					timeline.to(
						icon,
						{
							rotate: isOpening ? 45 : 0,
							...tweens.icon,
						},
						0,
					);
				}

				instance.timeline = timeline;
			});
		};

		if (isOpening) instance.frameId = requestAnimationFrame(run);
		else run();
	},

	cleanup: (accordion) => {
		if (!accordion) return;

		accordion.querySelectorAll('.UIAccordion__entry').forEach((entryRoot) => {
			const instance = getInstance(entryRoot);

			if (instance && instance.frameId !== null) cancelAnimationFrame(instance.frameId);
			instance?.timeline?.kill();
			deleteInstance(entryRoot);
		});

		deleteInstance(accordion);
	},
};

export { animateUIAccordion };
