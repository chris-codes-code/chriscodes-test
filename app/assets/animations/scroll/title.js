import { createScrollReveal, reveal } from '~/assets/animations/utils/scroll-reveal.js';

const animateContentTitle = createScrollReveal((element) => {
	// Section wrapper only — never the marquee track.
	reveal(element, {
		trigger: element,
		start: 'top 88%',
		end: 'bottom 12%',
		from: {
			clipPath: 'inset(12% 0 12% 0)',
			opacity: 0,
			yPercent: 18,
			scale: 0.97,
			transformOrigin: '50% 50%',
		},
		to: {
			clipPath: 'inset(0% 0 0% 0)',
			opacity: 1,
			yPercent: 0,
			scale: 1,
		},
	});
});

export { animateContentTitle };
