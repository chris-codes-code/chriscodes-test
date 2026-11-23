const config = {
	duration: {
		primary: 0.25,
		secondary: 0.5,
		tertiary: 1,
		reveal: 1.05,
		outro: 0.7,
		intro: 1.15,
		headerIntro: 0.55,
	},
	ease: {
		primary: 'power2.out',
		secondary: 'power3.inOut',
		tertiary: 'power2.inOut',
		reveal: 'power3.out',
		outro: 'power2.in',
		intro: 'power3.out',
	},
	scroll: {
		start: 'top 82%',
		end: 'bottom 18%',
		toggleActions: 'play none none reverse',
	},
	intro: {
		titleDelay: 0,
		secondaryDelay: 0.2,
	},
};

export { config };
