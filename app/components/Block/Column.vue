<template>
	<div class="BlockColumn">
		<slot />
	</div>
</template>

<style>
	.BlockColumn {
		padding-top: var(--block-columns-gap-y);
		padding-left: var(--block-columns-gap-x);
	}
</style>
