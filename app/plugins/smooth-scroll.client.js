import { setLenis } from '~/assets/animations/utils/lenis-store';
import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

export default defineNuxtPlugin(async () => {
	// Native scroll on touch / reduced-motion — Lenis + GSAP sync is the mobile jank source.
	if (prefersReducedMotion() || prefersNativeScroll()) {
		setLenis(null);

		return {
			provide: {
				lenis: null,
			},
		};
	}

	const [{ default: Lenis }, { getGSAP }] = await Promise.all([
		import('lenis'),
		import('~/assets/animations/utils/gsap-loader'),
	]);
	await import('lenis/dist/lenis.css');

	const { ScrollTrigger } = getGSAP();

	// Keep Lenis on its own rAF loop so it never stalls the GSAP ticker.
	const lenis = new Lenis({
		autoRaf: true,
		duration: 1.15,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,
		touchMultiplier: 1.5,
	});

	setLenis(lenis);
	lenis.on('scroll', ScrollTrigger.update);

	const refreshScrollTrigger = () => {
		ScrollTrigger.refresh();
	};

	requestAnimationFrame(refreshScrollTrigger);

	if (typeof window !== 'undefined') {
		window.addEventListener('load', refreshScrollTrigger, { once: true });
	}

	const router = useRouter();

	router.afterEach(() => {
		requestAnimationFrame(() => {
			lenis.resize();
			ScrollTrigger.refresh();
		});
	});

	return {
		provide: {
			lenis,
		},
		hooks: {
			'app:beforeUnmount': () => {
				lenis.destroy();
				setLenis(null);
			},
		},
	};
});
