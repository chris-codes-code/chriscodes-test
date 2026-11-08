<script setup>
	import { getAspectRatio } from '~/utils/aspect-ratio.js';

	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		fit: {
			default: 'cover',
			type: String,
		},
		height: {
			required: true,
			type: Number,
		},
		rootMargin: {
			default: '100px',
			type: String,
		},
		width: {
			required: true,
			type: Number,
		},
	});

	const target = ref(null);
	const observer = ref(null);
	const loadImage = ref(false);
	const imageLoaded = ref(false);

	onMounted(() => {
		observer.value = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.value.disconnect();
						loadImage.value = true;
					}
				});
			},
			{
				rootMargin: props.rootMargin,
				threshold: 0,
			},
		);

		if (target.value && observer.value) {
			observer.value.observe(target.value);
		}
	});

	onBeforeUnmount(() => {
		if (observer.value) {
			observer.value.disconnect();
		}
	});

	const handleImageLoaded = async () => {
		await nextTick();
		imageLoaded.value = true;
	};
</script>

<template>
	<div
		ref="target"
		class="MediaImageLazy"
		:class="[`MediaImageLazy--fit-${fit}`, $attrs.class]"
		:style="{ aspectRatio: getAspectRatio(width, height) }"
	>
		<PrimitiveImage
			v-if="loadImage"
			v-bind="$attrs"
			:class="{
				MediaImageLazy__image: true,
				'MediaImageLazy__image--loaded': imageLoaded,
			}"
			:fit="fit"
			:height="height"
			:width="width"
			@image-loaded="handleImageLoaded"
		/>
	</div>
</template>

<style>
	.MediaImageLazy {
		position: relative;
		width: 100%;

		&--fit {
			&-cover {
				--image-lazy-fit: cover;
			}

			&-contain {
				--image-lazy-fit: contain;
			}
		}

		&__image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100% !important;
			height: 100% !important;
			opacity: 0;
			object-fit: var(--image-lazy-fit);

			&--loaded {
				opacity: 1;
				animation: fade-in var(--transition-medium-ease);
			}
		}
	}
</style>
