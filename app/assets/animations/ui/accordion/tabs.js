import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const ENTER_STAGGER = 0.05;

const tweens = {
	entries: {
		duration: config.duration.secondary,
		ease: config.ease.primary,
	},
	height: {
		duration: config.duration.secondary,
		ease: config.ease.primary,
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

const getWrapperInstance = (wrapper) =>
	ensureInstance(wrapper, () => {
		const { gsap } = getGSAP();
		return {
			context: gsap.context(() => {}),
			enterPrepared: null,
			enterStartHeight: null,
			enterTargetHeight: null,
			enterTimeline: null,
			leaveTimeline: null,
		};
	});

const getContext = (wrapper) => getWrapperInstance(wrapper).context;

const getTabsRoot = (wrapper) => wrapper.closest('.UIAccordionTabs');

const getTabsRootInstance = (tabsElement) => ensureInstance(tabsElement, () => ({ lastPanelHeight: null }));

const getEntries = (wrapper) => [...wrapper.querySelectorAll('.UIAccordion__entry')];

const stashHeightFromExitingPanel = (tabsElement, heightPx) => {
	if (tabsElement) getTabsRootInstance(tabsElement).lastPanelHeight = heightPx;
};

const startHeightForEnteringPanel = (tabsElement, measuredNaturalHeightPx) => {
	if (!tabsElement) return measuredNaturalHeightPx;

	return getTabsRootInstance(tabsElement).lastPanelHeight ?? measuredNaturalHeightPx;
};

const onEnterHeights = (wrapper) => {
	const targetHeight = Math.max(wrapper.offsetHeight, 1);
	const startHeight = startHeightForEnteringPanel(getTabsRoot(wrapper), targetHeight);
	return { startHeight, targetHeight };
};

const clearStyles = (wrapper, gsap = null) => {
	if (gsap) {
		gsap.set(wrapper, { clearProps: 'height,overflow,visibility' });
		return;
	}

	wrapper.style.removeProperty('height');
	wrapper.style.removeProperty('overflow');
	wrapper.style.removeProperty('visibility');
};

// Vue may call onEnter before child accordion entries have mounted; defer
// measurement one microtask and let onEnter await the same promise.
const prepareEnter = (wrapper) => {
	const instance = getWrapperInstance(wrapper);

	if (!instance.enterPrepared) {
		const { gsap } = getGSAP();

		gsap.set(wrapper, {
			overflow: 'hidden',
			visibility: 'hidden',
		});

		instance.enterPrepared = Promise.resolve().then(() => {
			const context = getContext(wrapper);

			context.add(() => {
				gsap.set(wrapper, {
					height: 'auto',
					overflow: 'hidden',
					visibility: 'hidden',
				});
				void wrapper.offsetHeight;

				const { startHeight, targetHeight } = onEnterHeights(wrapper);

				gsap.set(wrapper, {
					height: startHeight,
					overflow: 'hidden',
					visibility: 'hidden',
				});
				gsap.set(getEntries(wrapper), { opacity: 0, y: 8 });

				instance.enterStartHeight = startHeight;
				instance.enterTargetHeight = targetHeight;
			});
		});
	}

	return instance.enterPrepared;
};

const animateUIAccordionTabs = {
	beforeEnter: (wrapper) => {
		prepareEnter(wrapper);
	},

	onEnter: async (wrapper, done) => {
		await prepareEnter(wrapper);

		const { gsap } = getGSAP();
		const context = getContext(wrapper);
		const instance = getWrapperInstance(wrapper);

		const finishEnter = () => {
			gsap.set(wrapper, { height: 'auto' });
			gsap.set(getEntries(wrapper), { clearProps: 'opacity,transform' });
			clearStyles(wrapper, gsap);
			instance.enterTimeline = null;
			instance.enterPrepared = null;
			deleteInstance(wrapper);
			done();
		};

		context.add(() => {
			const targetHeight = instance.enterTargetHeight ?? 1;
			const startHeight = instance.enterStartHeight ?? targetHeight;
			const entries = getEntries(wrapper);

			if (!entries.length) {
				finishEnter();
				return;
			}

			instance.enterTimeline?.kill();
			instance.enterTimeline = null;

			const timeline = gsap.timeline({
				onComplete: finishEnter,
			});

			timeline.set(wrapper, { visibility: 'visible' }, 0);

			if (startHeight !== targetHeight) {
				timeline.to(
					wrapper,
					{
						height: targetHeight,
						...tweens.height,
					},
					0,
				);
			}

			timeline.to(
				entries,
				{
					opacity: 1,
					stagger: ENTER_STAGGER,
					y: 0,
					...tweens.entries,
				},
				0,
			);

			instance.enterTimeline = timeline;
		});
	},

	onLeave: (wrapper, done) => {
		const { gsap } = getGSAP();
		const instance = getWrapperInstance(wrapper);

		const finishLeave = () => {
			instance.leaveTimeline = null;
			deleteInstance(wrapper);
			done();
		};

		const lockedHeight = Math.max(wrapper.offsetHeight, 1);
		stashHeightFromExitingPanel(getTabsRoot(wrapper), lockedHeight);

		instance.enterTimeline?.kill();
		instance.enterTimeline = null;

		const context = getContext(wrapper);

		context.add(() => {
			gsap.set(wrapper, {
				height: lockedHeight,
				overflow: 'hidden',
			});

			const entries = getEntries(wrapper);

			if (!entries.length) {
				finishLeave();
				return;
			}

			const timeline = gsap.timeline({ onComplete: finishLeave });

			timeline.to(entries, {
				opacity: 0,
				...tweens.entries,
			});

			instance.leaveTimeline = timeline;
		});
	},

	cleanup: (wrapper) => {
		if (!wrapper) return;

		const instance = getInstance(wrapper);
		instance?.enterTimeline?.kill();
		instance?.leaveTimeline?.kill();
		deleteInstance(wrapper);
		clearStyles(wrapper);

		const tabsElement = getTabsRoot(wrapper);
		if (tabsElement) deleteInstance(tabsElement);
	},
};

export { animateUIAccordionTabs };
