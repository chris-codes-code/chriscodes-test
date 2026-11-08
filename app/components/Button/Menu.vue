<script setup>
	const { isMenuOpen, setMenuOpen } = useModal();

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen.value);
	};

	const label = computed(() => (isMenuOpen.value ? 'Close menu' : 'Open menu'));
</script>

<template>
	<PrimitiveButton
		class="ButtonMenu"
		:active="isMenuOpen"
		:label="label"
		@click="toggleMenu"
	>
		<StyleUIButtonIcon>
			<SVGIcon icon="menu" />
		</StyleUIButtonIcon>
	</PrimitiveButton>
</template>

<style>
	.ButtonMenu {
		display: flex;
		height: 100%;
	}
</style>
