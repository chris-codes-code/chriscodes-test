import { config } from '~/assets/animations/config';
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const tweens = {
	section: {
		duration: config.duration.primary,
		ease: config.ease.primary,
	},
};

const ensureInstance = (element, create) => {
	let instance = getInstance(element);

	if (!instance) {
		instance = create();
		setInstance(element, instance);
	}

	return instance;
};

const getContext = (element) => {
	const instance = ensureInstance(element, () => {
		const { gsap } = getGSAP();
		return { context: gsap.context(() => {}), timeline: null };
	});

	return instance.context;
};

const getElements = (element) => ({
	error: element.querySelector('.FormSubmit__section--error'),
	submit: element.querySelector('.FormSubmit__section--submit'),
	success: element.querySelector('.FormSubmit__section--success'),
});

const getNotification = (status, { error, success }) => (status === 'success' ? success : error);

const animateNotificationIn = ({ emit, gsap, notification, submit }) => {
	gsap.set(notification, { visibility: 'visible', left: -5, top: 0 });

	const timeline = gsap.timeline();

	timeline
		.to(submit, {
			opacity: 0,
			...tweens.section,
			onComplete: () => {
				gsap.set(submit, { visibility: 'hidden' });
			},
		})
		.to(notification, {
			opacity: 1,
			top: 0,
			left: 0,
			...tweens.section,
			onComplete: () => {
				emit('notification-in');
			},
		});

	return timeline;
};

const animateSubmitIn = ({ emit, gsap, notification, submit }) => {
	gsap.set(submit, { visibility: 'visible' });

	const timeline = gsap.timeline();

	timeline
		.to(notification, {
			opacity: 0,
			top: 0,
			left: -5,
			...tweens.section,
			onComplete: () => {
				gsap.set(notification, { visibility: 'hidden' });
				emit('notification-out');
			},
		})
		.to(submit, {
			opacity: 1,
			...tweens.section,
			onComplete: () => {
				emit('submit-in');
			},
		});

	return timeline;
};

const animateFormSubmit = {
	toggle: (element, status, previousStatus, emit) => {
		if (!element) return;

		const { gsap } = getGSAP();
		const context = getContext(element);
		const instance = getInstance(element);
		const elements = getElements(element);
		const { submit } = elements;

		if (!submit) return;

		instance.timeline?.kill();
		instance.timeline = null;

		const notification = getNotification(status || previousStatus, elements);
		if (!notification) return;

		context.add(() => {
			instance.timeline = status
				? animateNotificationIn({ emit, gsap, notification, submit })
				: animateSubmitIn({ emit, gsap, notification, submit });
		});
	},

	cleanup: (element) => {
		if (!element) return;

		const instance = getInstance(element);
		instance?.timeline?.kill();
		instance?.context?.revert();
		deleteInstance(element);
	},
};

export { animateFormSubmit };
