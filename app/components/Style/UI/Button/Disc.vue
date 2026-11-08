<template>
	<span
		class="StyleUIButtonDisc"
		aria-hidden="true"
	>
		<slot />

		<span
			class="StyleUIButtonDisc__inner"
			style="color: white"
		>
			Menu
		</span>
	</span>
</template>

<style>
	.StyleUIButtonDisc {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		/* background-color: currentColor; */
		/* width: 40px; */
		height: 40px;
		/* background: black; */
		color: inherit;
		/* border: 1px solid black; */
	}
</style>
