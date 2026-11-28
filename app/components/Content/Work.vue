<script setup>
	const props = defineProps({
		entries: {
			default: null,
			type: Array,
		},
	});

	const projectsPerRow = 2;
	const activeEntry = ref(null);

	const rows = computed(() => {
		if (!props.entries?.length) return [];

		const chunks = [];

		for (let index = 0; index < props.entries.length; index += projectsPerRow) {
			chunks.push(props.entries.slice(index, index + projectsPerRow));
		}

		return chunks;
	});

	const isModalOpen = computed(() => Boolean(activeEntry.value));

	const rootRef = ref(null);
	let workAnimation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		workAnimation = (await import('~/assets/animations/scroll/work.js')).animateContentWork;
		workAnimation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		rootEl = rootRef.value;
	});

	onUnmounted(() => {
		if (workAnimation && rootEl) workAnimation.cleanup(rootEl);
	});

	const openEntry = (entry) => {
		if (activeEntry.value) return;

		if (import.meta.client) {
			const active = document.activeElement;
			if (active instanceof HTMLElement) active.blur();
		}

		// Outro + modal open together
		workAnimation?.out?.(rootRef.value);
		activeEntry.value = entry;
	};

	const closeEntry = () => {
		// Intro back + modal close together
		workAnimation?.in?.(rootRef.value);
		activeEntry.value = null;
	};
</script>

<template>
	<div
		v-if="rows.length"
		ref="rootRef"
		class="ContentWork"
	>
		<StyleTicker
			v-for="(row, rowIndex) in rows"
			:key="`content-work-row-${rowIndex}`"
			class="ContentWork__entries"
			:direction="rowIndex % 2 === 0 ? 'left' : 'right'"
			pause-on-hover
			:speed="20"
		>
			<PrimitiveButton
				v-for="(entry, index) in row"
				:key="`content-work-${rowIndex}-${index}`"
				class="ContentWork__entry"
				:label="`View project: ${entry.title}`"
				@click="openEntry(entry)"
			>
				<MediaImageLazy
					v-if="entry.image"
					class="ContentWork__image"
					v-bind="entry.image"
				/>
			</PrimitiveButton>
		</StyleTicker>

		<ModalOverlay
			class="ContentWork__modal"
			:is-open="isModalOpen"
			@close-modal="closeEntry"
		>
			<template
				v-if="activeEntry"
				#main
			>
				<div class="ContentWork__detail">
					<header class="ContentWork__detail-header">
						<h2
							v-if="activeEntry.title"
							class="ContentWork__detail-title type-heading type-heading--h2"
						>
							{{ activeEntry.title }}
						</h2>

						<ul
							v-if="activeEntry.categories?.length"
							class="ContentWork__detail-categories"
						>
							<li
								v-for="category in activeEntry.categories"
								:key="category"
								class="ContentWork__detail-category"
							>
								{{ category }}
							</li>
						</ul>
					</header>

					<div
						v-if="activeEntry.vimeo || activeEntry.muxPlaybackId || activeEntry.image"
						class="ContentWork__detail-media"
					>
						<iframe
							v-if="activeEntry.vimeo"
							class="ContentWork__detail-video"
							:src="`${activeEntry.vimeo}${activeEntry.vimeo.includes('?') ? '&' : '?'}autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0`"
							:title="`${activeEntry.title || 'Project'} video`"
							allow="autoplay; fullscreen; picture-in-picture"
							allowfullscreen
						/>

						<MediaMuxPlayer
							v-else-if="activeEntry.muxPlaybackId"
							class="ContentWork__detail-video"
							:playback-id="activeEntry.muxPlaybackId"
							:poster="activeEntry.image?.src || null"
							:title="activeEntry.title || ''"
						/>

						<MediaImageLazy
							v-else
							class="ContentWork__detail-image"
							v-bind="activeEntry.image"
						/>
					</div>

					<div
						v-if="activeEntry.link"
						class="ContentWork__detail-keynotes"
					>
						<PrimitiveLink
							v-bind="activeEntry.link"
							class="ContentWork__detail-link"
						>
							<StyleUILink :text="activeEntry.link.text" />
						</PrimitiveLink>
					</div>

					<div
						v-if="activeEntry.description"
						class="ContentWork__detail-description"
					>
						<StyleText>
							<PrimitiveHTML :html="activeEntry.description" />
						</StyleText>
					</div>
				</div>
			</template>
		</ModalOverlay>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ContentWork {
		display: flex;
		flex-direction: column;
		gap: var(--columns-gap-y);

		&__entries {
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;
			will-change: transform;

			.StyleTicker__track,
			.StyleTicker__set {
				gap: var(--columns-gap-x);
			}

			&:has(.ContentWork__entry:hover) {
				.ContentWork__entry {
					opacity: 0.25;
				}
			}
		}

		&__entry {
			transition: opacity var(--transition-duration-medium);

			&:hover {
				opacity: 1 !important;
			}

			@media (orientation: portrait) {
				width: calc(4 / var(--columns) * (100vw - var(--container-gutter) * 2));
			}

			@media (orientation: landscape) {
				width: calc(2 / var(--columns) * (100vw - var(--container-gutter) * 2));
			}
		}

		&__image {
			width: 100%;
			border-radius: 20px;
			corner-shape: squircle;
			outline: 1px solid color-mix(in srgb, var(--theme-color-secondary) 5%, transparent);
			overflow: hidden;
			transition: outline-color var(--theme-color-ease);
		}

		&__detail {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: var(--content-width-md);
			margin: 0 auto;
			padding: 0 var(--container-gutter) var(--space-xl);
		}

		&__detail-header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-md);
			margin-bottom: var(--space-lg);
		}

		&__detail-title {
			margin: 0;
		}

		&__detail-categories {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-xs);
		}

		&__detail-category {
			padding: 0.35em 0.75em;
			border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
			border-radius: 999px;
			font-size: 0.75rem;
		}

		&__detail-media {
			width: 100%;
			aspect-ratio: 16 / 9;
			border-radius: 20px;
			corner-shape: squircle;
			/* outline: 1px solid color-mix(in srgb, var(--theme-color-secondary) 5%, transparent); */
			overflow: hidden;
			transition: outline-color var(--theme-color-ease);
		}

		&__detail-image,
		&__detail-video {
			width: 100%;
			height: 100%;
		}

		&__detail-video {
			display: block;
			border: 0;
		}

		&__detail-keynotes {
			margin-top: var(--space-sm);
		}

		&__detail-link {
			display: inline-flex;
			width: fit-content;
			/* text-decoration: underline; */
			/* text-underline-offset: 0.2em; */
			font-size: 1rem;
		}

		&__detail-description {
			padding-block: var(--space-lg);
		}
	}
</style>
