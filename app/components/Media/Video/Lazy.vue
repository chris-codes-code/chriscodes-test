<script setup>
	import { getAspectRatio } from '~/utils/aspect-ratio.js';

	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		eager: {
			default: false,
			type: Boolean,
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

	const emit = defineEmits(['video-loaded']);

	const target = ref(null);
	const observer = ref(null);
	const loadVideo = ref(false);
	const videoLoaded = ref(false);

	onMounted(() => {
		if (props.eager) {
			loadVideo.value = true;
			return;
		}

		observer.value = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.value.disconnect();
						loadVideo.value = true;
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

	const handleVideoLoaded = async (video) => {
		await nextTick();
		videoLoaded.value = true;
		emit('video-loaded', video);
	};
</script>

<template>
	<div
		ref="target"
		class="MediaVideoLazy"
		:class="$attrs.class"
		:style="{ aspectRatio: getAspectRatio(width, height) }"
	>
		<div
			v-if="loadVideo"
			class="MediaVideoLazy__media"
			:class="{ 'MediaVideoLazy__media--loaded': videoLoaded }"
		>
			<PrimitiveVideo
				v-bind="$attrs"
				:preload="eager ? 'auto' : 'metadata'"
				@video-loaded="handleVideoLoaded"
			/>
		</div>
	</div>
</template>

<style>
	.MediaVideoLazy {
		position: relative;
		width: 100%;

		&__media {
			position: absolute;
			inset: 0;
			opacity: 0;

			&--loaded {
				opacity: 1;
				animation: fade-in var(--transition-medium-ease);
			}
		}
	}
</style>
