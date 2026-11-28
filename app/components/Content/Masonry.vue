<script setup>
	defineProps({
		items: {
			default: () => [],
			type: Array,
		},
	});

	const activeItem = ref(null);

	const isModalOpen = computed(() => Boolean(activeItem.value));

	const openItem = (item) => {
		if (import.meta.client && document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		activeItem.value = item;
	};

	const closeItem = () => {
		activeItem.value = null;
	};

	const rootRef = ref(null);
	let animation = null;
	let rootEl = null;

	onMounted(async () => {
		if (!rootRef.value) return;

		animation = (await import('~/assets/animations/scroll/masonry.js')).animateContentMasonry;
		animation.init(rootRef.value);
	});

	onBeforeUnmount(() => {
		rootEl = rootRef.value;
	});

	onUnmounted(() => {
		if (animation && rootEl) animation.cleanup(rootEl);
	});
</script>

<template>
	<div
		v-if="items.length"
		ref="rootRef"
		class="ContentMasonry"
	>
		<BlockContainer>
			<UIMasonry :item-count="items.length">
				<UIMasonryItem
					v-for="item in items"
					:key="item.id"
					class="ContentMasonry__item"
				>
					<article class="ContentMasonry__card">
						<PrimitiveButton
							v-if="item.image && item.body"
							class="ContentMasonry__image-button"
							:label="`Read more: ${item.title}`"
							@click="openItem(item)"
						>
							<MediaImageLazy
								class="ContentMasonry__image"
								v-bind="item.image"
							/>
						</PrimitiveButton>

						<MediaImageLazy
							v-else-if="item.image"
							class="ContentMasonry__image"
							v-bind="item.image"
						/>

						<h3
							v-if="item.title"
							class="ContentMasonry__title type-heading type-heading--h3"
						>
							{{ item.title }}
						</h3>

						<StyleText
							v-if="item.text"
							class="ContentMasonry__text"
						>
							<PrimitiveHTML :html="item.text" />
						</StyleText>

						<PrimitiveButton
							v-if="item.body"
							class="ContentMasonry__read-more"
							:label="`Read more: ${item.title}`"
							@click="openItem(item)"
						>
							<StyleUIButton>Read more</StyleUIButton>
						</PrimitiveButton>
					</article>
				</UIMasonryItem>
			</UIMasonry>
		</BlockContainer>

		<ModalOverlay
			class="ContentMasonry__modal"
			:is-open="isModalOpen"
			@close-modal="closeItem"
		>
			<template
				v-if="activeItem"
				#main
			>
				<div class="ContentMasonry__detail">
					<header class="ContentMasonry__detail-header">
						<h2
							v-if="activeItem.title"
							class="ContentMasonry__detail-title type-heading type-heading--h2"
						>
							{{ activeItem.title }}
						</h2>
					</header>

					<div
						v-if="activeItem.image"
						class="ContentMasonry__detail-media"
					>
						<MediaImageLazy
							class="ContentMasonry__detail-image"
							v-bind="activeItem.image"
						/>
					</div>

					<div
						v-if="activeItem.body"
						class="ContentMasonry__detail-body"
					>
						<StyleText>
							<PrimitiveHTML :html="activeItem.body" />
						</StyleText>
					</div>
				</div>
			</template>
		</ModalOverlay>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.ContentMasonry {
		&__item {
			width: 50%;

			@media (--screen-tablet) {
				width: calc(100% / 3);
			}

			@media (--screen-desktop) {
				width: 25%;
			}
		}

		&__card {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-sm);
		}

		&__image-button {
			display: block;
			width: 100%;
			cursor: pointer;
		}

		&__image {
			width: 100%;
			height: auto;
			overflow: hidden;
			border-radius: 20px;
			corner-shape: squircle;
			outline: 1px solid color-mix(in srgb, var(--theme-color-secondary) 5%, transparent);
			transition: outline-color var(--theme-color-ease);
		}

		&__title {
			margin: 0;
			font-size: 1.25rem;
			line-height: 1.3;
		}

		&__text {
			font-size: 16px;
			line-height: 1.45;

			p {
				font-size: 16px;
				line-height: 1.45;
			}
		}

		&__read-more {
			width: fit-content;
			margin-top: var(--space-xs);
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
			margin-bottom: var(--space-lg);
		}

		&__detail-title {
			margin: 0;
		}

		&__detail-media {
			width: 100%;
			aspect-ratio: 16 / 9;
			border-radius: 20px;
			corner-shape: squircle;
			outline: 1px solid color-mix(in srgb, var(--theme-color-secondary) 5%, transparent);
			overflow: hidden;
			transition: outline-color var(--theme-color-ease);
		}

		&__detail-image {
			width: 100%;
			height: 100%;
		}

		&__detail-body {
			padding-block: var(--space-lg);
		}
	}
</style>
