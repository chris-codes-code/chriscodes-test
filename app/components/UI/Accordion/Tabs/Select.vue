<script setup>
	defineProps({
		activeTabIndex: {
			default: 0,
			type: Number,
		},
		label: {
			default: 'Select',
			type: String,
		},
		tabs: {
			default: null,
			type: Array,
		},
	});

	const emit = defineEmits(['update-index']);

	const id = `ui-accordion-tabs-select-${useId()}`;
</script>

<template>
	<form class="UIAccordionTabsSelect">
		<label
			class="UIAccordionTabsSelect__label type-ui"
			:for="id"
		>
			{{ label }}
		</label>

		<div class="UIAccordionTabsSelect__input-wrapper">
			<select
				:id="id"
				class="UIAccordionTabsSelect__input"
				:value="activeTabIndex"
				@change="emit('update-index', parseInt($event.target.value, 10))"
			>
				<option
					v-for="(tab, index) in tabs"
					:key="`ui-accordion-tabs-select-option-${index}`"
					:value="index"
				>
					{{ tab.title }}
				</option>
			</select>

			<SVGIcon
				class="UIAccordionTabsSelect__input-icon"
				icon="chevron"
				override-size
			/>
		</div>
	</form>
</template>

<style>
	.UIAccordionTabsSelect {
		font: var(--font-body);
		text-align: left;

		&__label {
			display: block;
			padding-bottom: var(--space-sm);
			pointer-events: all;
			cursor: pointer;
			color: currentColor;
			white-space: nowrap;
		}

		&__input-wrapper {
			position: relative;
		}

		&__input {
			appearance: none;
			position: relative;
			width: 100%;
			background-color: var(--color-white);
			color: currentColor;
			border-radius: 0;
			border: 1px solid rgba(var(--color-black-rgb), 0.25);
			padding: var(--space-sm) 40px var(--space-sm) var(--space-sm);
			text-align: inherit;
			cursor: pointer;

			&:focus {
				outline: none;
			}
		}

		&__input-icon {
			position: absolute;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			width: 15px;
			height: auto;
			pointer-events: none;
		}
	}
</style>
