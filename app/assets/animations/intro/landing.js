import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';
import { demote, gpu, willChange } from '~/assets/animations/utils/scroll-reveal.js';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const getLandingElements = (hero) => {
	const primary = hero.querySelector('.HeroScroller__container--primary');
	const secondary = hero.querySelector('.HeroScroller__container--secondary');

	return { primary, secondary };
};

const animateLandingIntro = {
	init: (element) => {
		if (!element || prefersReducedMotion()) return;

		const { gsap, ScrollTrigger } = getGSAP();
		const { primary, secondary } = getLandingElements(element);

		let timeline = null;
		let safetyTimer = 0;
		let cancelled = false;

		const context = gsap.context(() => {
			gsap.set(element, {
				...gpu,
				opacity: 1,
				scale: 1,
				filter: 'blur(0px)',
			});

			// Lock from-state sync so the FOUC hold can lift without a flash.
			if (primary) {
				gsap.set(primary, {
					...gpu,
					willChange,
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
					...gpu,
					willChange,
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

				// Drop compositor hints once the intro settles.
				[primary, secondary, element].forEach((node) => {
					if (node) demote(node);
				});

				gsap.fromTo(
					element,
					{
						...gpu,
						opacity: 1,
						scale: 1,
						filter: 'blur(0px)',
					},
					{
						...gpu,
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
				paused: true,
				defaults: {
					ease: config.ease.intro,
					...gpu,
				},
				onComplete: finish,
			});

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
					0,
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
				return;
			}

			// Two frames: paint the from-state + promoted layers, then play.
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (cancelled) return;
					gsap.ticker.wake();
					timeline.play(0);
				});
			});

			safetyTimer = window.setTimeout(() => {
				if (finished) return;
				timeline?.progress(1);
				finish();
			}, 3200);
		}, element);

		setInstance(element, {
			context,
			safetyTimer,
			timeline,
			cancel: () => {
				cancelled = true;
			},
		});
	},

	cleanup: (element) => {
		if (!element) return;

		const instance = getInstance(element);
		instance?.cancel?.();
		window.clearTimeout(instance?.safetyTimer);
		instance?.timeline?.kill();
		instance?.context?.revert();
		deleteInstance(element);
	},
};

export { animateLandingIntro };
