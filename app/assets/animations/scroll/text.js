import { config } from '~/assets/animations/config';
import { createScrollReveal, gpu, scrollTriggerVars } from '~/assets/animations/utils/scroll-reveal.js';

const splitWords = (SplitText, node, className) =>
	SplitText.create(node, {
		type: 'words',
		wordsClass: className,
		aria: 'none',
	}).words;

const animateContentText = createScrollReveal((element, { gsap, SplitText }) => {
	const title = element.querySelector('.ContentText__title');
	const body = element.querySelector('.StyleText');
	const groups = [];

	if (title) {
		groups.push({
			words: splitWords(SplitText, title, 'ContentText__split-word'),
			from: { opacity: 0, y: 28, filter: 'blur(6px)' },
			stagger: 0.05,
			at: 0,
		});
	}

	if (body) {
		groups.push({
			words: splitWords(SplitText, body, 'ContentText__split-word'),
			from: { opacity: 0, y: 18, filter: 'blur(6px)' },
			stagger: 0.03,
			at: title ? 0.1 : 0,
		});
	}

	if (!groups.length) return;

	const timeline = gsap.timeline({
		scrollTrigger: scrollTriggerVars(element),
	});

	groups.forEach(({ words, from, stagger, at }) => {
		gsap.set(words, { ...gpu, ...from });
		timeline.to(
			words,
			{
				...gpu,
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: config.duration.reveal,
				ease: config.ease.reveal,
				stagger,
			},
			at,
		);
	});
});

export { animateContentText };
