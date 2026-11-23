import { createScrollReveal, reveal } from '~/assets/animations/utils/scroll-reveal.js';

const animateContentImage = createScrollReveal((element) => {
	const media = element.querySelector('.ContentImage__column') || element;

	reveal(media, {
		trigger: element,
		from: {
			opacity: 0,
			y: 64,
			scale: 0.97,
			filter: 'blur(8px)',
			transformOrigin: '50% 80%',
		},
		to: {
			opacity: 1,
			y: 0,
			scale: 1,
			filter: 'blur(0px)',
		},
	});
});

export { animateContentImage };
