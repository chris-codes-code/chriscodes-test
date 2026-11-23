import { createScrollReveal, gpu, reveal } from '~/assets/animations/utils/scroll-reveal.js';

const animateContentMasonry = createScrollReveal((element, { gsap, ScrollTrigger }) => {
	const items = element.querySelectorAll('.ContentMasonry__item');
	if (!items.length) return;

	// Lock opacity sync so ready can flip without a flash; bind ST after layout.
	gsap.set(items, {
		...gpu,
		opacity: 0,
		y: 56,
		scale: 0.94,
		filter: 'blur(6px)',
		transformOrigin: '50% 80%',
	});

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			reveal(items, {
				trigger: element,
				to: {
					opacity: 1,
					y: 0,
					scale: 1,
					filter: 'blur(0px)',
				},
				stagger: {
					amount: 0.55,
					from: 'start',
					ease: 'power1.out',
				},
			});
			ScrollTrigger.refresh();
		});
	});
});

export { animateContentMasonry };
