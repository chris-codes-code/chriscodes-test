<script setup>
	defineProps({
		disabled: {
			default: false,
			type: Boolean,
		},
		id: {
			required: true,
			type: String,
		},
		input: {
			required: true,
			type: Object,
		},
	});

	const emit = defineEmits(['update']);

	const updateInput = (event) => {
		emit('update', event.target.checked);
	};
</script>

<template>
	<div class="FormInput__consent">
		<label
			class="FormInput__consent-control"
			:for="id"
		>
			<input
				:id="id"
				class="FormInput__consent-input"
				:checked="Boolean(input.value)"
				:disabled="disabled || input.disabled"
				:name="input.name"
				type="checkbox"
				@change="updateInput"
			/>

			<span
				aria-hidden="true"
				class="FormInput__consent-box"
			/>

			<span
				v-if="input.text"
				class="FormInput__consent-text"
			>
				{{ input.text }}
			</span>
		</label>

		<PrimitiveHTML
			v-if="input.description"
			class="FormInput__consent-description type-body"
			tag="div"
			:html="input.description"
		/>
	</div>
</template>

<style>
	.FormInput {
		&__consent {
			gap: var(--space-sm);
		}

		&__consent-control {
			display: inline-flex;
			align-items: center;
			gap: var(--space-sm);
			cursor: pointer;
			color: currentColor;
			text-align: left;

			&:has(.FormInput__consent-input:disabled) {
				cursor: not-allowed;
			}
		}

		&__consent-input {
			position: absolute;
			opacity: 0;
			width: 1px;
			height: 1px;
			margin: 0;
			pointer-events: none;

			&:checked + .FormInput__consent-box {
				&::after {
					opacity: 1;
					transform: translate(-50%, -60%) rotate(45deg) scale(1);
				}
			}

			&:focus + .FormInput__consent-box,
			&:focus-visible + .FormInput__consent-box {
				border-color: var(--form-input-border-color-focus);

				&::before {
					opacity: 1;
				}
			}
		}

		&__consent-box {
			position: relative;
			flex-shrink: 0;
			width: 1.25rem;
			height: 1.25rem;
			background-color: transparent;
			border: 1px solid var(--form-input-border-color);
			transition: border-color var(--transition-fast-ease);

			&::before {
				content: '';
				position: absolute;
				inset: 0;
				pointer-events: none;
				box-shadow: var(--form-input-box-shadow-focus);
				opacity: 0;
				transition: opacity var(--transition-fast-ease);
			}

			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 0.3rem;
				height: 0.55rem;
				border: solid currentColor;
				border-width: 0 1.5px 1.5px 0;
				opacity: 0;
				transform: translate(-50%, -60%) rotate(45deg) scale(0.8);
				transition:
					opacity var(--transition-fast-ease),
					transform var(--transition-fast-ease);
			}
		}

		&__consent-text {
			user-select: none;
		}

		&__consent-description {
			color: rgb(from currentColor r g b / 75%);

			text-wrap: balance;

			@supports not (text-wrap: balance) {
				text-wrap: pretty;
			}
		}
	}
</style>
