import { config } from '~/assets/animations/config';
import { createScrollReveal, demote, gpu, promote, reveal } from '~/assets/animations/utils/scroll-reveal.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

const rowsOf = (element) => element.querySelectorAll('.ContentWork__entries');

const from = {
	opacity: 0,
	y: 72,
	scale: 0.96,
	filter: 'blur(8px)',
	transformOrigin: '50% 80%',
};

const to = {
	opacity: 1,
	y: 0,
	scale: 1,
	filter: 'blur(0px)',
};

const work = createScrollReveal((element) => {
	const rows = rowsOf(element);
	if (!rows.length) return;

	const scrollTween = reveal(rows, {
		trigger: element,
		from,
		to,
		stagger: 0.14,
	});

	return { scrollTween, modalTween: null };
});

const animateContentWork = {
	init: work.init,
	cleanup: work.cleanup,

	out: (element) => {
		if (!element || prefersReducedMotion()) return;

		const instance = work.getInstance(element);
		const rows = rowsOf(element);
		if (!instance || !rows.length) return;

		const { gsap } = getGSAP();

		instance.scrollTween?.scrollTrigger?.disable(false);
		instance.modalTween?.kill();

		instance.context.add(() => {
			promote(rows);
			instance.modalTween = gsap.to(rows, {
				...gpu,
				opacity: 0,
				y: 48,
				scale: 0.96,
				filter: 'blur(10px)',
				duration: config.duration.outro,
				ease: config.ease.outro,
				stagger: 0.08,
			});
		});
	},

	in: (element) => {
		if (!element || prefersReducedMotion()) return;

		const instance = work.getInstance(element);
		const rows = rowsOf(element);
		if (!instance || !rows.length) return;

		const { gsap } = getGSAP();

		instance.modalTween?.kill();

		instance.context.add(() => {
			promote(rows);
			instance.modalTween = gsap.to(rows, {
				...gpu,
				...to,
				duration: config.duration.reveal * 0.85,
				ease: config.ease.reveal,
				stagger: 0.1,
				onComplete: () => {
					demote(rows);
					instance.scrollTween?.progress(1);
					instance.scrollTween?.scrollTrigger?.enable();
				},
			});
		});
	},
};

export { animateContentWork };
