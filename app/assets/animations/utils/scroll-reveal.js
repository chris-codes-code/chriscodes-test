import { config } from '~/assets/animations/config';

const scrollTriggerConfig = (trigger, { start, end } = {}) => ({
	trigger,
	start: start ?? config.scroll.start,
	end: end ?? config.scroll.end,
	toggleActions: config.scroll.toggleActions,
});

export { scrollTriggerConfig };
