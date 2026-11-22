<script setup>
	const { isContactOpen, toggleContact } = useModal();

	const label = computed(() => (isContactOpen.value ? 'Close contact' : "Let's talk"));
</script>

<template>
	<PrimitiveButton
		class="ButtonProject"
		:active="isContactOpen"
		:label="label"
		@click="toggleContact"
	>
		<StyleUIButtonIcon text>
			<span class="ButtonProject__label">
				Let's talk

				<SVGIcon
					class="ButtonProject__arrow"
					icon="arrow"
					override-size
				/>
			</span>
		</StyleUIButtonIcon>
	</PrimitiveButton>
</template>

<style>
	.ButtonProject {
		display: flex;
		height: 100%;
		color: inherit;

		&__label {
			display: inline-flex;
			align-items: center;
			gap: var(--space-xs);
		}

		&__arrow {
			width: 10px;
			height: 10px;
		}
	}
</style>
