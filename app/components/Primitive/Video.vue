<script setup>
	defineOptions({
		inheritAttrs: false,
	});

	const props = defineProps({
		autoplay: {
			default: true,
			type: Boolean,
		},
		loop: {
			default: true,
			type: Boolean,
		},
		muted: {
			default: true,
			type: Boolean,
		},
		playsinline: {
			default: true,
			type: Boolean,
		},
		poster: {
			default: null,
			type: String,
		},
		preload: {
			default: 'none',
			type: String,
			validator: (value) => ['auto', 'metadata', 'none'].includes(value),
		},
		src: {
			required: true,
			type: String,
		},
	});

	const emit = defineEmits(['video-loaded']);

	const videoRef = ref(null);
	let hasEmittedLoaded = false;
	let playAttempts = 0;

	const resetPlayback = () => {
		hasEmittedLoaded = false;
		playAttempts = 0;
	};

	const tryPlay = async () => {
		const video = videoRef.value;
		if (!video || !props.autoplay) return;

		try {
			await video.play();
		} catch {
			if (playAttempts < 2) {
				playAttempts += 1;
				requestAnimationFrame(tryPlay);
			}
		}
	};

	const handleLoaded = (event) => {
		const video = event.target;

		tryPlay();

		if (hasEmittedLoaded) return;

		hasEmittedLoaded = true;
		emit('video-loaded', video);
	};

	watch(() => props.src, resetPlayback);

	onMounted(() => {
		const video = videoRef.value;
		if (!video) return;

		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			handleLoaded({ target: video });
		}
	});

	onBeforeUnmount(() => {
		videoRef.value?.pause();
	});
</script>

<template>
	<video
		v-if="src"
		ref="videoRef"
		:autoplay="autoplay"
		class="PrimitiveVideo"
		:loop="loop"
		:muted="muted"
		:playsinline="playsinline"
		:poster="poster || undefined"
		:preload="preload"
		:src="src"
		@canplay="tryPlay"
		@loadeddata="handleLoaded"
	/>
</template>

<style>
	.PrimitiveVideo {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
