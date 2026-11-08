import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let gsapContext = null;

const getGSAP = () => {
	if (gsapContext) return gsapContext;

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, DrawSVGPlugin);
	}

	gsapContext = {
		CustomEase,
		DrawSVGPlugin,
		gsap,
		ScrollTrigger,
		SplitText,
	};

	return gsapContext;
};

export { getGSAP };
