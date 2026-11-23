import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const getLandingElements = (hero) => {
	const primary = hero.querySelector('.HeroScroller__container--primary');
	const secondary = hero.querySelector('.HeroScroller__container--secondary');
	const headerIsland = document.querySelector('.CoreHeader__island');
	const headerParts = headerIsland
		? [
				...headerIsland.querySelectorAll(
					'.CoreHeader__section--start, .CoreHeader__section--center, .CoreHeader__section--end',
				),
			]
		: [];

	return { headerIsland, headerParts, primary, secondary };
};

const animateLandingIntro = {
	init: (element) => {
		if (!element) return;

		if (prefersReducedMotion()) {
			document.documentElement.setAttribute('data-intro', 'ready');
			return;
		}

		const { gsap, ScrollTrigger } = getGSAP();
		const { headerIsland, headerParts, primary, secondary } = getLandingElements(element);

		document.documentElement.setAttribute('data-intro', 'pending');

		let timeline = null;
		let safetyTimer = 0;

		const context = gsap.context(() => {
			gsap.set(element, {
				opacity: 1,
				scale: 1,
				filter: 'blur(0px)',
			});

			if (headerIsland) {
				gsap.set(headerIsland, {
					autoAlpha: 0,
					y: -28,
					scale: 0.92,
					filter: 'blur(12px)',
					transformOrigin: '50% 0%',
				});
			}

			if (headerParts.length) {
				gsap.set(headerParts, {
					autoAlpha: 0,
					y: 10,
				});
			}

			if (primary) {
				gsap.set(primary, {
					autoAlpha: 0,
					yPercent: 18,
					clipPath: 'inset(18% 0 18% 0)',
					filter: 'blur(14px)',
					scale: 0.98,
					transformOrigin: '50% 50%',
				});
			}

			if (secondary) {
				gsap.set(secondary, {
					autoAlpha: 0,
					yPercent: 12,
					clipPath: 'inset(20% 0 20% 0)',
					filter: 'blur(10px)',
					scale: 0.985,
					transformOrigin: '50% 50%',
				});
			}

			let finished = false;

			const finish = () => {
				if (finished) return;
				finished = true;
				window.clearTimeout(safetyTimer);

				if (headerIsland) {
					gsap.set(headerIsland, {
						clearProps: 'opacity,visibility,transform,filter,scale',
					});
				}

				if (headerParts.length) {
					gsap.set(headerParts, {
						clearProps: 'opacity,visibility,transform',
					});
				}

				document.documentElement.setAttribute('data-intro', 'ready');

				gsap.fromTo(
					element,
					{
						opacity: 1,
						scale: 1,
						filter: 'blur(0px)',
					},
					{
						opacity: 0.35,
						scale: 0.97,
						filter: 'blur(4px)',
						ease: 'none',
						scrollTrigger: {
							trigger: element,
							start: 'top top',
							end: 'bottom top',
							scrub: 0.6,
							invalidateOnRefresh: true,
						},
					},
				);

				ScrollTrigger.refresh();
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
			}, 3200);

			if (headerIsland) {
				timeline.to(
					headerIsland,
					{
						autoAlpha: 1,
						y: 0,
						scale: 1,
						filter: 'blur(0px)',
						duration: config.duration.intro * 0.75,
					},
					config.intro.headerDelay,
				);
			}

			if (headerParts.length) {
				timeline.to(
					headerParts,
					{
						autoAlpha: 1,
						y: 0,
						duration: config.duration.intro * 0.6,
						stagger: 0.06,
					},
					config.intro.headerDelay + 0.06,
				);
			}

			if (primary) {
				timeline.to(
					primary,
					{
						autoAlpha: 1,
						yPercent: 0,
						clipPath: 'inset(0% 0 0% 0)',
						filter: 'blur(0px)',
						scale: 1,
						duration: config.duration.intro,
					},
					config.intro.titleDelay,
				);
			}

			if (secondary) {
				timeline.to(
					secondary,
					{
						autoAlpha: 1,
						yPercent: 0,
						clipPath: 'inset(0% 0 0% 0)',
						filter: 'blur(0px)',
						scale: 1,
						duration: config.duration.intro,
					},
					config.intro.secondaryDelay,
				);
			}

			if (!timeline.getChildren().length) {
				finish();
			} else {
				gsap.ticker.wake();
			}
		}, element);

		setInstance(element, { context, safetyTimer, timeline });
	},

	cleanup: (element) => {
		if (!element) return;

		document.documentElement.setAttribute('data-intro', 'ready');

		const instance = getInstance(element);
		window.clearTimeout(instance?.safetyTimer);
		instance?.timeline?.kill();
		instance?.context?.revert();
		deleteInstance(element);
	},
};

export { animateLandingIntro };
