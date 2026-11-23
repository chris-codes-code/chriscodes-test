<script setup>
	const PANEL_OPEN_OFFSET = 5;

	const { headerPanel, isHeaderPanelOpen } = useModal();

	const rootRef = ref(null);
	const contentRef = ref(null);
	const panelHeight = ref(0);

	// Even gaps: top gap after open offset = ((header - island) / 2) - 5 ≈ 25px,
	// so max height is 100vh - 50px. Keep this in sync with the CSS below.
	const getMaxHeight = () => {
		const styles = rootRef.value ? getComputedStyle(rootRef.value) : null;
		const headerHeight = parseFloat(styles?.getPropertyValue('--core-header-height')) || 110;
		const containerHeight = parseFloat(styles?.getPropertyValue('--core-header-container-height')) || 50;
		const edgeGap = (headerHeight - containerHeight) / 2 - PANEL_OPEN_OFFSET;

		return window.innerHeight - edgeGap * 2;
	};

	const measure = async () => {
		await nextTick();
		const el = contentRef.value;
		if (!el) {
			panelHeight.value = 0;
			return;
		}

		const maxHeight = getMaxHeight();
		// Animate the visible height only — never larger than the capped panel
		panelHeight.value = Math.min(el.scrollHeight + 20, maxHeight);
	};

	watch([headerPanel, isHeaderPanelOpen], () => measure(), { flush: 'post' });

	onMounted(() => {
		measure();

		const onResize = () => measure();
		window.addEventListener('resize', onResize);

		const observer = new ResizeObserver(() => measure());
		if (contentRef.value) observer.observe(contentRef.value);

		onUnmounted(() => {
			observer.disconnect();
			window.removeEventListener('resize', onResize);
		});
	});
</script>

<template>
	<div
		ref="rootRef"
		class="CoreHeaderPanel"
		:class="{ 'CoreHeaderPanel--open': isHeaderPanelOpen }"
		:style="{ '--core-header-panel-height': `${panelHeight}px` }"
		:inert="!isHeaderPanelOpen"
	>
		<div class="CoreHeaderPanel__background --theme-inverse" />

		<div
			ref="contentRef"
			class="CoreHeaderPanel__content"
		>
			<Transition
				name="core-header-panel"
				mode="out-in"
				@after-enter="measure"
				@after-leave="measure"
			>
				<div
					v-if="headerPanel === 'menu'"
					key="menu"
					class="CoreHeaderPanel__panel"
				>
					<slot name="menu" />
				</div>

				<div
					v-else-if="headerPanel === 'contact'"
					key="contact"
					class="CoreHeaderPanel__panel CoreHeaderPanel__panel--contact"
				>
					<slot name="contact" />
				</div>
			</Transition>
		</div>
	</div>
</template>

<style>
	.CoreHeaderPanel {
		--core-header-panel-ease: var(--transition-ease-out);
		--core-header-panel-spring: var(--transition-spring);
		--core-header-panel-height: 0px;
		--core-header-panel-open-offset: 5px;
		--core-header-panel-edge-gap: calc(
			(var(--core-header-height) - var(--core-header-container-height)) / 2 - var(--core-header-panel-open-offset)
		);
		--core-header-panel-max-height: calc(100dvh - var(--core-header-panel-edge-gap) * 2);

		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		pointer-events: none;

		&--open {
			pointer-events: auto;
		}

		&__background {
			position: absolute;
			top: 0;
			left: 50%;
			translate: -50% 0;
			width: calc(100% + 20px);
			height: var(--core-header-container-height);
			opacity: 0;
			scale: 0.96;
			transform-origin: top center;
			border-radius: 20px;
			corner-shape: squircle;
			border: 1px solid color-mix(in srgb, var(--theme-color-primary) 5%, transparent);
			transition:
				height 0.5s var(--core-header-panel-spring),
				scale 0.5s var(--core-header-panel-spring),
				opacity 0.3s var(--core-header-panel-ease),
				top 0.3s var(--core-header-panel-ease),
				var(--theme-transition);
		}

		&--open &__background {
			top: calc(0px - var(--core-header-panel-open-offset));
			height: max(var(--core-header-container-height), var(--core-header-panel-height));
			opacity: 1;
			scale: 1;
		}

		&__content {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			height: fit-content;
			max-height: var(--core-header-panel-max-height);
			padding: calc(var(--core-header-container-height) + var(--space-sm)) var(--space-sm) var(--space-sm);
			color: var(--theme-color-primary);
			opacity: 0;
			overflow: hidden;
			overscroll-behavior: contain;
			transition: opacity 0.3s var(--core-header-panel-ease);
		}

		&--open &__content {
			opacity: 1;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			transition: opacity 0.3s var(--core-header-panel-ease) 0.15s;
		}

		&__panel {
			width: 100%;

			&--contact {
				min-width: min(100%, 320px);
			}
		}

		@media (prefers-reduced-motion: reduce) {
			&__background,
			&__content,
			&--open &__content {
				transition: none;
			}
		}
	}

	.core-header-panel-enter-active,
	.core-header-panel-leave-active {
		transition:
			opacity 0.25s var(--transition-ease-out),
			translate 0.25s var(--transition-ease-out);
	}

	.core-header-panel-enter-from,
	.core-header-panel-leave-to {
		opacity: 0;
		translate: 0 6px;
	}

	@media (prefers-reduced-motion: reduce) {
		.core-header-panel-enter-active,
		.core-header-panel-leave-active {
			transition: none;
		}

		.core-header-panel-enter-from,
		.core-header-panel-leave-to {
			translate: none;
		}
	}
</style>
