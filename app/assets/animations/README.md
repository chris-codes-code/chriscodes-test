# Animations

A component lazy-loads a module, passes its root element, and cleans up when it unmounts. GSAP stays in this folder — not in `.vue` files.

Each module stores a `gsap.context()` ([docs](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)). That records tweens and ScrollTriggers created for that element so one `revert()` on unmount restores the DOM.

## Summary

- `**getGSAP()**` — loads GSAP and plugins once on the client
- **Instance store** — one WeakMap per module, keyed to the DOM element
- `**scrollTriggerConfig()**` — shared ScrollTrigger defaults from `config.scroll`
- `**config.js**` — shared animation values

## How to use

### Animation module

Load GSAP from the loader. Create a store. On `init`, make a context scoped to the element and save it. A tween can run straight away in that context, or you can add one later when required. On `cleanup`, revert and delete.

```js
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const ensureInstance = (root) => {
	let instance = getInstance(root);

	if (!instance) {
		const { gsap } = getGSAP();
		instance = { context: gsap.context(() => {}, root) };
		setInstance(root, instance);
	}

	return instance;
};

const animateExample = {
	init(root) {
		if (!root || getInstance(root)) return;

		const instance = ensureInstance(root);
		instance.context.add(() => {
			// tweens here
		});
	},

	cleanup(root) {
		if (!root) return;

		getInstance(root)?.context?.revert();
		deleteInstance(root);
	},
};

export { animateExample };
```

### Adding tweens

When an animation is required later, add it to the context:

```js
in: (root) => {
	const { gsap } = getGSAP();
	const instance = getInstance(root);
	if (!instance) return;

	instance.context.add(() => {
		gsap.to('.box', { opacity: 1 });
	});
},

out: (root) => {
	const { gsap } = getGSAP();
	const instance = getInstance(root);
	if (!instance) return;

	instance.context.add(() => {
		gsap.to('.box', { opacity: 0 });
	});
},
```

### Vue component

1. On mount, lazy-load the animation module and `init` it with the root element.
2. In `onBeforeUnmount`, assign the root element — the root element ref is empty by `onUnmounted`.
3. In `onUnmounted`, call `cleanup` with the assigned root element.

```vue
<template>
	<div ref="rootRef"></div>
</template>

<script setup>
	const rootRef = ref(null);
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/example.js')).animateExample;
		animation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		rootEl = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && rootEl) animation.cleanup(rootEl);
	});
</script>
```

## Config

`config.js` holds shared animation values for this project (duration, ease, etc.). Use it from animation modules instead of hard-coded numbers so motion stays consistent when values change.

Scroll reveals should use `scrollTriggerConfig(trigger)` from `utils/scroll-reveal.js` so start/end/`toggleActions` stay shared.

## What’s here

- `config.js` — shared animation values
- `intro/` — first-load sequences (hero landing; companion fades in on its own)
- `modal/` — modal animations
- `scroll/` — ScrollTrigger reveals (text, title, work, masonry, image)
- `ui/` — component animations
- `utils/` — loader, instance store, scrollTriggerConfig, body scroll lock, Lenis store, reduced-motion helper (Lenis / companion only)

## Smooth scroll

Lenis is lazy-loaded in `app/plugins/smooth-scroll.client.js` and synced with ScrollTrigger on desktop and mobile (skipped only for reduced-motion). Body scroll lock pauses Lenis when present and never sets overflow on `html`/`body`.

## Motion systems (kept separate)

- **Hero landing** (`intro/landing.js`) — hero title sequence from `Hero/Scroller`.
- **Scroll reveals** — content sections; CSS hides targets until GSAP owns them after `init`.
- **Companion** — sits outside the hero GSAP targets; fades in only via its own `--ready` class when the GLB has loaded. Skipped on coarse-pointer / touch for now (WebGL cost).
