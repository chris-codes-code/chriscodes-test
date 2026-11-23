import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const getHeaderParts = (island) => [
	...island.querySelectorAll(
		'.CoreHeader__section--start, .CoreHeader__section--center, .CoreHeader__section--end',
	),
];

const animateHeaderIntro = {
	init: (element, { onComplete } = {}) => {
		if (!element) return;

		if (prefersReducedMotion()) {
			document.documentElement.setAttribute('data-header-intro', 'ready');
			onComplete?.();
			return;
		}

		const { gsap } = getGSAP();
		const headerParts = getHeaderParts(element);

		document.documentElement.setAttribute('data-header-intro', 'pending');

		let timeline = null;
		let safetyTimer = 0;

		const context = gsap.context(() => {
			gsap.set(element, {
				autoAlpha: 0,
				y: -16,
				scale: 0.96,
				filter: 'blur(8px)',
				transformOrigin: '50% 0%',
			});

			if (headerParts.length) {
				gsap.set(headerParts, {
					autoAlpha: 0,
					y: 8,
				});
			}

			let finished = false;

			const finish = () => {
				if (finished) return;
				finished = true;
				window.clearTimeout(safetyTimer);

				// Drop the FOUC hold before clearing inline props so the island
				// doesn't flash hidden for a frame.
				document.documentElement.setAttribute('data-header-intro', 'ready');

				gsap.set(element, {
					clearProps: 'opacity,visibility,transform,filter,scale',
				});

				if (headerParts.length) {
					gsap.set(headerParts, {
						clearProps: 'opacity,visibility,transform',
					});
				}

				onComplete?.();
			};

			timeline = gsap.timeline({
				defaults: {
					ease: config.ease.intro,
				},
				onComplete: finish,
			});

			safetyTimer = window.setTimeout(() => {
				if (finished) return;
				timeline?.progress(1);
				finish();
			}, 1600);

			timeline.to(
				element,
				{
					autoAlpha: 1,
					y: 0,
					scale: 1,
					filter: 'blur(0px)',
					duration: config.duration.headerIntro,
				},
				0,
			);

			if (headerParts.length) {
				timeline.to(
					headerParts,
					{
						autoAlpha: 1,
						y: 0,
						duration: config.duration.headerIntro * 0.75,
						stagger: 0.04,
					},
					0.04,
				);
			}

			gsap.ticker.wake();
		}, element);

		setInstance(element, { context, safetyTimer, timeline });
	},

	cleanup: (element) => {
		if (!element) return;

		document.documentElement.setAttribute('data-header-intro', 'ready');

		const instance = getInstance(element);
		window.clearTimeout(instance?.safetyTimer);
		instance?.timeline?.kill();
		instance?.context?.revert();
		deleteInstance(element);
	},
};

export { animateHeaderIntro };
