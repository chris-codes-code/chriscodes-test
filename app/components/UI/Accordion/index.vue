<script setup>
	const props = defineProps({
		disabled: {
			default: false,
			type: Boolean,
		},
		entries: {
			default: null,
			type: Array,
		},
	});

	const emit = defineEmits(['accordion-opening', 'accordion-opened', 'accordion-closing', 'accordion-closed']);

	const accordionRef = ref(null);
	let accordionAnimation = null;
	let accordionEl = null;

	onMounted(async () => {
		if (!accordionRef.value) return;

		accordionAnimation = (await import('~/assets/animations/ui/accordion/index.js')).animateUIAccordion;
		if (accordionAnimation) accordionAnimation.init(accordionRef.value);
	});

	onBeforeUnmount(() => {
		accordionEl = accordionRef.value;
	});

	onUnmounted(() => {
		if (accordionAnimation && accordionEl) accordionAnimation.cleanup(accordionEl);
	});

	const accordionAnimationCallbacks = {
		onEnter: (index) => emit('accordion-opening', index),
		afterEnter: (index) => emit('accordion-opened', index),
		onLeave: (index) => emit('accordion-closing', index),
		afterLeave: (index) => emit('accordion-closed', index),
	};

	const toggleAccordion = (event, index) => {
		if (props.disabled) {
			event.preventDefault();
			return;
		}

		if (accordionAnimation && accordionRef.value) {
			accordionAnimation.toggle(event, accordionRef.value, index, accordionAnimationCallbacks);
		}
	};
</script>

<template>
	<div
		v-if="entries"
		ref="accordionRef"
		class="UIAccordion"
		:class="{ 'UIAccordion--disabled': disabled }"
	>
		<div
			v-for="(entry, index) in entries"
			:key="`ui-accordion-entry-${index}`"
			class="UIAccordion__entry"
		>
			<details class="UIAccordion__details">
				<summary
					class="UIAccordion__summary"
					@click="(event) => toggleAccordion(event, index)"
				>
					<span class="UIAccordion__title">{{ entry.title }}</span>

					<SVGIcon
						class="UIAccordion__icon"
						icon="cross"
					/>
				</summary>

				<div class="UIAccordion__content-wrapper">
					<div class="UIAccordion__content">
						<StyleText>
							<PrimitiveHTML
								v-if="entry.text"
								:html="entry.text"
							/>
						</StyleText>

						<PrimitiveLink
							v-if="entry.link"
							class="UIAccordion__link"
							:type="entry.link.type || 'internal'"
							:url="entry.link.url"
						>
							<StyleUILink :text="entry.link.text" />
						</PrimitiveLink>
					</div>
				</div>
			</details>
		</div>
	</div>
</template>

<style>
	.UIAccordion {
		--ui-accordion-icon-size: 15px;

		width: 100%;

		&--disabled {
			pointer-events: none;
		}

		&__entry {
			border-bottom: 1px solid color-mix(in srgb, currentColor 25%, transparent);

			&:first-child {
				border-top: 1px solid color-mix(in srgb, currentColor 25%, transparent);
			}
		}

		&__icon {
			width: var(--ui-accordion-icon-size);
		}

		&__summary {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-md);
			width: 100%;
			padding: var(--space-md) 0;
			cursor: pointer;
			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}
		}

		&__content-wrapper {
			overflow: hidden;
			height: 0;
		}

		&__content {
			padding-right: var(--ui-accordion-icon-size);
			padding-bottom: var(--space-md);
		}

		&__link {
			display: inline-block;
			margin-top: var(--space-md);
		}
	}
</style>
