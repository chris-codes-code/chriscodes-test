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
	<div class="UIModalExampleOverlay">
		<div class="UIModalExampleOverlay__actions">
			<PrimitiveButton
				label="Open overlay modal"
				@click="open"
			>
				<StyleUIButton>Open</StyleUIButton>
			</PrimitiveButton>
		</div>

		<ModalOverlay
			class="UIModalExampleOverlay__modal"
			:is-open="isOpen"
			@close-modal="close"
		>
			<template #main>
				<div class="UIModalExampleOverlay__content">
					<p class="UIModalExampleOverlay__text">Example <code>ModalOverlay</code></p>
				</div>
			</template>
		</ModalOverlay>
	</div>
</template>

<style>
	.UIModalExampleOverlay {
		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-sm);
		}

		&__content {
			padding: 0 var(--container-gutter) var(--space-lg);
		}

		&__text {
			margin: 0;
		}
	}
</style>
