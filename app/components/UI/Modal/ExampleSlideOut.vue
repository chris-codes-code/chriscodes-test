<script setup>
	const isOpen = ref(false);

	const open = () => {
		isOpen.value = true;
	};

	const close = () => {
		isOpen.value = false;
	};
</script>

<template>
	<div class="UIModalExampleSlideOut">
		<div class="UIModalExampleSlideOut__actions">
			<PrimitiveButton
				label="Open slide-out modal"
				@click="open"
			>
				<StyleUIButton>Open</StyleUIButton>
			</PrimitiveButton>
		</div>

		<ModalSlideOut
			class="UIModalExampleSlideOut__modal"
			:is-open="isOpen"
			@close-modal="close"
		>
			<template #main>
				<div class="UIModalExampleSlideOut__content">
					<p class="UIModalExampleSlideOut__text">Example <code>ModalSlideOut</code></p>
				</div>
			</template>
		</ModalSlideOut>
	</div>
</template>

<style>
	.UIModalExampleSlideOut {
		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-sm);
		}

		&__content {
			padding: 0 var(--container-gutter) var(--space-lg);
		}
	}
</style>
