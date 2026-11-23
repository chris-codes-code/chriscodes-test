# Animations

A component lazy-loads a module, passes its root element, and cleans up when it unmounts. GSAP stays in this folder — not in `.vue` files.

Each module stores a `gsap.context()` ([docs](https://gsap.com/docs/v3/GSAP/gsap.context%28%29/)). That records tweens and ScrollTriggers created for that element so one `revert()` on unmount restores the DOM.

## Summary

- `**getGSAP()**` — loads GSAP and plugins once on the client
- **Instance store** — one WeakMap per module, keyed to the DOM element
- `**scroll-reveal.js**` — lean `reveal()` + `createScrollReveal()` for scroll modules (force3D / backface)
- `**config.js**` — shared animation values

## How to use

### Animation module

Load GSAP from the loader. Create a store. On `init`, make a context scoped to the element and save it. A tween can run straight away in that context, or you can add one later when required. On `cleanup`, revert and delete.

```js
import { createElementInstanceStore } from '~/assets/animations/utils/create-element-instance-store.js';
import { getGSAP } from '~/assets/animations/utils/gsap-loader';

const { deleteInstance, getInstance, setInstance } = createElementInstanceStore();

const animateExample = {
	init: (element) => {
		if (!element) return;

		const { gsap } = getGSAP();
		const context = gsap.context(() => {}, element);
		setInstance(element, { context });
	},

	cleanup: (element) => {
		if (!element) return;
		getInstance(element)?.context?.revert();
		deleteInstance(element);
	},
};

export { animateExample };
```

### Adding tweens

When an animation is required later, add it to the context:

```js
in: (element) => {
	const { gsap } = getGSAP();
	const context = getInstance(element)?.context;
	if (!context) return;

	context.add(() => {
		gsap.to('.box', { opacity: 1 });
	});
},

out: (element) => {
	const { gsap } = getGSAP();
	const context = getInstance(element)?.context;
	if (!context) return;

	context.add(() => {
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
	let element = null;

	onMounted(async () => {
		animation = (await import('~/assets/animations/example.js')).animateExample;
		animation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		element = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && element) animation.cleanup(element);
	});
</script>
```

## Config

`config.js` holds shared animation values for this project (duration, ease, etc.). Use it from animation modules instead of hard-coded numbers so motion stays consistent when values change.

## What’s here

- `config.js` — shared animation values
- `intro/` — first-load sequences (header + hero landing; companion fades in on its own)
- `modal/` — modal animations
- `scroll/` — ScrollTrigger intro/outro reveals (text, title, work, masonry, image, hero)
- `ui/` — component animations
- `utils/` — loader, instance store, scroll-reveal helper, body scroll lock, Lenis store, reduced-motion helper

## Smooth scroll

Lenis is lazy-loaded in `app/plugins/smooth-scroll.client.js` and synced with ScrollTrigger on fine-pointer only (skipped for reduced-motion and coarse-pointer / touch). Scroll-reveal FOUC holds and GSAP tweens also skip on touch so content paints immediately. Body scroll lock pauses Lenis when present and never sets overflow on `html`/`body`. Prefer `useScrollAnimation()` in Vue components rather than wiring GSAP in `.vue` files.

## Motion systems (kept separate)

- **Header intro** (`intro/header.js`) — first-paint island reveal from `CoreHeader`. Owns `data-header-intro` only; scroll-hide stays locked until it finishes.
- **Hero landing** (`intro/landing.js`) — hero title sequence via `useScrollAnimation` / `data-scroll-reveal`. Not tied to the header.
- **Scroll reveals** — content sections use the same `data-scroll-reveal` FOUC hold; GSAP owns opacity after ready.
- **Companion** — sits outside the hero GSAP targets; fades in only via its own `--ready` class when the GLB has loaded (no cursor look-at on coarse pointers).
