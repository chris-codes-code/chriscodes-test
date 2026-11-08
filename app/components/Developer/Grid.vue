<script setup>
	import layoutConfig from '~/assets/layout/config.json';

	const { breakpoints, gridColor, screens } = layoutConfig;
	const showGrid = ref(false);
	const columns = ref(0);
	const screenLabel = ref('');

	const updateLayout = () => {
		const screenSize = document.documentElement.clientWidth;

		columns.value = breakpoints.reduce(
			(count, breakpoint) => (screenSize >= breakpoint.min ? breakpoint.columns : count),
			breakpoints[0].columns,
		);

		const screen =
			screens.find(({ min, max }) => screenSize >= min && (max === null || screenSize <= max)) || screens[0];

		screenLabel.value = screen.name.secondary
			? `${screen.name.primary} / ${screen.name.secondary}`
			: screen.name.primary;
	};

	onMounted(() => {
		updateLayout();

		window.addEventListener('resize', updateLayout);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateLayout);
	});
</script>

<template>
	<div
		class="DeveloperGrid"
		:style="{ '--developer-grid-color': gridColor }"
	>
		<BlockContainer
			v-if="showGrid"
			class="DeveloperGrid__container"
		>
			<div
				class="DeveloperGrid__columns"
				:style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }"
			>
				<div
					v-for="column in Array.from({ length: columns }, (_, index) => index + 1)"
					:key="column"
					class="DeveloperGrid__column"
				/>
			</div>
		</BlockContainer>

		<div class="DeveloperGrid__panel">
			<div class="DeveloperGrid__controls">
				<button
					aria-label="Toggle grid"
					class="DeveloperGrid__control"
					type="button"
					@click="showGrid = !showGrid"
				>
					{{ showGrid ? 'Hide' : 'Show' }} grid
				</button>
			</div>

			<div class="DeveloperGrid__screen-size">
				Screen:
				<strong>{{ screenLabel }}</strong>
			</div>
		</div>
	</div>
</template>

<style>
	.DeveloperGrid {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		font-size: 10px;

		&__container {
			height: 100%;
		}

		&__columns {
			display: grid;
			grid-template-columns: repeat(var(--columns), 1fr);
			gap: var(--columns-gap-x);
			height: 100%;
		}

		&__column {
			height: 100%;
			opacity: 0.5;
			border-left: 1px solid var(--developer-grid-color);
			border-right: 1px solid var(--developer-grid-color);
		}

		&__panel {
			display: flex;
			flex-direction: row;
			position: absolute;
			bottom: 0;
			right: 0;
			gap: 10px;
			padding: 20px;
		}

		&__controls {
			display: flex;
			gap: 10px;
			pointer-events: initial;
		}

		&__screen-size,
		&__control {
			padding: 1.5em;
			background-color: white;
			border: 1px solid lightgrey;
			color: black;
			text-transform: uppercase;
			border-radius: 0.5em;
		}

		&__control {
			cursor: pointer;
		}

		&__screen-size {
			display: flex;
			gap: 0.35em;
		}
	}
</style>
