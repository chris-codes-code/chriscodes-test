<script setup>
	import { getAspectRatio } from '~/utils/aspect-ratio.js';

	const props = defineProps({
		autoplay: {
			default: false,
			type: Boolean,
		},
		autoplayDelay: {
			default: 5000,
			type: Number,
		},
		images: {
			required: true,
			type: Array,
		},
		showControls: {
			default: true,
			type: Boolean,
		},
	});

	const paginationLength = props.images.length;
	const hasMultipleSlides = paginationLength > 1;
	const lastSlideIndex = paginationLength - 1;

	const activeSlideIndex = ref(0);
	const displaySlideIndex = ref(0);
	const isTransitioning = ref(false);

	const activeImage = computed(() => props.images[activeSlideIndex.value] ?? null);
	const displayedImage = computed(() => props.images[displaySlideIndex.value] ?? null);
	const frameAspectRatio = computed(() => {
		const { width, height } = displayedImage.value ?? {};
		return getAspectRatio(width, height);
	});

	let autoplayTimeoutId = null;

	const preloadImage = (src) =>
		new Promise((resolve) => {
			const img = new Image();
			img.onload = resolve;
			img.onerror = resolve;
			img.src = src;
		});

	const getSlideIndex = (slideIndex) => {
		if (slideIndex < 0) return lastSlideIndex;
		if (slideIndex > lastSlideIndex) return 0;
		return slideIndex;
	};

	watch(activeSlideIndex, async (nextIndex) => {
		if (nextIndex === displaySlideIndex.value) {
			isTransitioning.value = false;
			startAutoplay();
			return;
		}

		const src = props.images[nextIndex]?.src;

		if (src) await preloadImage(src);

		if (activeSlideIndex.value !== nextIndex) return;

		await nextTick();
		displaySlideIndex.value = nextIndex;
	});

	const goToSlide = (slideIndex) => {
		if (!hasMultipleSlides || isTransitioning.value) return;

		const nextIndex = getSlideIndex(slideIndex);

		if (nextIndex === activeSlideIndex.value) return;

		isTransitioning.value = true;
		clearAutoplayTimeout();
		activeSlideIndex.value = nextIndex;
	};

	const onFadeComplete = () => {
		isTransitioning.value = false;
		startAutoplay();
	};

	const clearAutoplayTimeout = () => {
		if (!autoplayTimeoutId) return;
		clearTimeout(autoplayTimeoutId);
		autoplayTimeoutId = null;
	};

	const startAutoplay = () => {
		clearAutoplayTimeout();
		if (!props.autoplay || !hasMultipleSlides) return;

		autoplayTimeoutId = setTimeout(() => {
			goToSlide(activeSlideIndex.value + 1);
		}, props.autoplayDelay);
	};

	onMounted(startAutoplay);
	onBeforeUnmount(clearAutoplayTimeout);
</script>

<template>
	<div
		v-if="paginationLength"
		class="UICarouselFade"
		:class="{ 'UICarouselFade--transitioning': isTransitioning }"
	>
		<div
			class="UICarouselFade__frame"
			:style="{ aspectRatio: frameAspectRatio }"
		>
			<PrimitiveImage
				v-if="!hasMultipleSlides && activeImage"
				class="UICarouselFade__image"
				v-bind="activeImage"
				fit="cover"
			/>

			<Transition
				v-else
				name="zoom-in"
				mode="in-out"
				@leave="onFadeComplete"
			>
				<PrimitiveImage
					v-if="displayedImage"
					:key="displaySlideIndex"
					class="UICarouselFade__image -transition-zoom-in"
					v-bind="displayedImage"
					fit="cover"
					loading="lazy"
				/>
			</Transition>
		</div>

		<div
			v-if="showControls && hasMultipleSlides"
			class="UICarouselFade__controls"
		>
			<UICarouselControls
				loop
				:active-slide-index="activeSlideIndex"
				:pagination-length="paginationLength"
				@previous="goToSlide(activeSlideIndex - 1)"
				@next="goToSlide(activeSlideIndex + 1)"
				@go-to="goToSlide"
			/>
		</div>
	</div>
</template>

<style>
	.UICarouselFade {
		&__frame {
			position: relative;
			width: 100%;
			overflow: hidden;
		}

		&__image {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__controls {
			margin-top: var(--space-sm);
		}

		&--transitioning &__controls {
			pointer-events: none;
		}
	}
</style>
