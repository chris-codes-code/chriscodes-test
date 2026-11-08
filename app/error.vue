<script setup>
	defineProps({
		error: {
			type: Object,
			required: true,
		},
	});

	const status = {
		404: 'Page not found',
		500: 'There was an issue',
	};
</script>

<template>
	<div class="Error">
		<BlockContainer>
			<div class="Error__container">
				<h1>{{ error.statusCode === 404 ? 404 : 500 }}</h1>

				<span class="type-heading type-heading--h3">
					{{ status[error.statusCode] || status[500] }}
				</span>

				<PrimitiveLink
					type="internal"
					url="/"
					label="Home"
					:gtm="{
						type: 'link',
						category: 'internal',
						clicked_from: 'error-page',
						label: 'Home',
						url: '/',
					}"
				>
					<StyleUIButton>Home</StyleUIButton>
				</PrimitiveLink>
			</div>
		</BlockContainer>
	</div>
</template>

<style>
	.Error {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;

		&__container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-md);
			text-align: center;
		}
	}
</style>
