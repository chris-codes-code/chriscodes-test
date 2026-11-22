<script setup>
	const props = defineProps({
		playbackId: {
			required: true,
			type: String,
		},
		poster: {
			default: null,
			type: String,
		},
		title: {
			default: '',
			type: String,
		},
	});

	const hasError = ref(false);
	const isPlaying = ref(false);
	const playerRef = ref(null);

	watch(
		() => props.playbackId,
		() => {
			hasError.value = false;
			isPlaying.value = false;
		},
	);

	const onError = () => {
		hasError.value = true;
		isPlaying.value = false;
	};

	const onPlaying = () => {
		isPlaying.value = true;
	};

	onMounted(() => {
		const player = playerRef.value;
		if (!player) return;

		player.addEventListener('error', onError);
		player.addEventListener('playing', onPlaying);
	});

	onBeforeUnmount(() => {
		const player = playerRef.value;
		if (!player) return;

		player.removeEventListener('error', onError);
		player.removeEventListener('playing', onPlaying);
	});
</script>

<template>
	<div class="MediaMuxPlayer">
		<img
			v-if="poster && (hasError || !isPlaying)"
			class="MediaMuxPlayer__poster"
			:alt="title || ''"
			:src="poster"
		/>

		<ClientOnly>
			<mux-player
				v-show="!hasError"
				ref="playerRef"
				class="MediaMuxPlayer__player"
				:metadata-video-id="playbackId"
				:metadata-video-title="title"
				:playback-id="playbackId"
				:poster="poster || undefined"
				preload="metadata"
				muted
				loop
				playsinline
				stream-type="on-demand"
				thumbnail-time="0"
			/>
		</ClientOnly>
	</div>
</template>

<style>
	.MediaMuxPlayer {
		position: relative;
		width: 100%;
		height: 100%;

		&__player,
		&__poster {
			position: absolute;
			inset: 0;
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			background: transparent;
		}

		&__player {
			--media-object-fit: cover;
		}
	}
</style>
