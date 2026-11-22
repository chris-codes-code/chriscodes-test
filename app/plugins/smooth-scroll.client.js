import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { getGSAP } from '~/assets/animations/utils/gsap-loader';
import { setLenis } from '~/assets/animations/utils/lenis-store';
import { prefersNativeScroll, prefersReducedMotion } from '~/assets/animations/utils/reduced-motion';

export default defineNuxtPlugin(() => {
	if (prefersReducedMotion() || prefersNativeScroll()) {
		setLenis(null);

		return {
			provide: {
				lenis: null,
			},
		};
	}

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
