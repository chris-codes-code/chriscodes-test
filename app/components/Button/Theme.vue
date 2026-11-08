<script setup>
	const { theme, toggleTheme } = useTheme();

	const changeTheme = () => {
		const body = document.body;

		body.classList.add('is-theme-transitioning');

		toggleTheme();

		const onEnd = (event) => {
			if (event.target !== body || event.propertyName !== 'background-color') return;

			body.classList.remove('is-theme-transitioning');
			body.removeEventListener('transitionend', onEnd);
		};

		body.addEventListener('transitionend', onEnd);
	};
</script>

<template>
	<PrimitiveButton
		class="ButtonTheme"
		label="Change theme"
		@click="changeTheme"
	>
		<StyleUIButtonIcon>
			<Transition
				name="theme"
				mode="out-in"
			>
				<SVGIcon
					v-if="theme === 'dark'"
					key="dark"
					class="ButtonTheme__icon"
					icon="dark"
					override-size
					style="width: 14px; height: 14px"
				/>

				<SVGIcon
					v-else
					key="light"
					class="ButtonTheme__icon"
					icon="light"
					override-size
					style="width: 20px; height: 20px"
				/>
			</Transition>
		</StyleUIButtonIcon>
	</PrimitiveButton>
</template>

<style>
	.ButtonTheme {
		display: flex;
		height: 100%;
		color: inherit;
	}
</style>
