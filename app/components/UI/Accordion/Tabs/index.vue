<script setup>
	const props = defineProps({
		tabs: {
			default: null,
			type: Array,
		},
	});

	const activeTabIndex = ref(0);
	const activeTab = computed(() => props.tabs?.[activeTabIndex.value] || null);
	const animating = ref(false);

	const accordionTransitionRef = ref(null);
	let accordionTabsAnimation = null;
	let accordionTransitionEl = null;

	onMounted(async () => {
		accordionTabsAnimation = (await import('~/assets/animations/ui/accordion/tabs.js')).animateUIAccordionTabs;
	});

	onBeforeUnmount(() => {
		accordionTransitionEl = accordionTransitionRef.value;
	});

	onUnmounted(() => {
		if (accordionTabsAnimation && accordionTransitionEl) accordionTabsAnimation.cleanup(accordionTransitionEl);
	});

	const onBeforeEnter = (el) => {
		animating.value = true;
		if (accordionTabsAnimation) accordionTabsAnimation.beforeEnter(el);
	};

	const onEnter = (el, done) => {
		const finish = () => {
			animating.value = false;
			done();
		};

		if (!accordionTabsAnimation) {
			finish();
			return;
		}

		Promise.resolve(accordionTabsAnimation.onEnter(el, finish)).catch(() => finish());
	};

	const onLeave = (el, done) => {
		animating.value = true;

		if (!accordionTabsAnimation) {
			done();
			return;
		}

		Promise.resolve(accordionTabsAnimation.onLeave(el, done)).catch(() => done());
	};

	const setActiveTabIndex = (tabIndex) => {
		if (tabIndex === activeTabIndex.value) return;
		activeTabIndex.value = tabIndex;
	};
</script>

<template>
	<div
		v-if="tabs"
		class="UIAccordionTabs"
	>
		<BlockColumns
			class="UIAccordionTabs__columns"
			gap-y="var(--space-md)"
		>
			<BlockColumn class="UIAccordionTabs__column UIAccordionTabs__column--tabs">
				<UIAccordionTabsSelect
					class="UIAccordionTabs__select"
					:active-tab-index="activeTabIndex"
					:tabs="tabs"
					@update-index="setActiveTabIndex"
				/>

				<UIAccordionTabsControls
					class="UIAccordionTabs__controls"
					:active-tab-index="activeTabIndex"
					:tabs="tabs"
					@update-index="setActiveTabIndex"
				/>
			</BlockColumn>

			<BlockColumn class="UIAccordionTabs__column UIAccordionTabs__column--entries">
				<Transition
					mode="out-in"
					:css="false"
					@before-enter="onBeforeEnter"
					@enter="onEnter"
					@leave="onLeave"
				>
					<div
						v-if="activeTab?.entries"
						ref="accordionTransitionRef"
						:key="activeTabIndex"
						class="UIAccordionTabs__accordion"
					>
						<UIAccordion
							:disabled="animating"
							:entries="activeTab.entries"
						/>
					</div>
				</Transition>
			</BlockColumn>
		</BlockColumns>
	</div>
</template>

<style>
	@import '~/assets/layout/css/media-queries.css';

	.UIAccordionTabs {
		&__column {
			width: 100%;

			&--tabs {
				@media (--screen-desktop) {
					width: 25%;
				}
			}

			&--entries {
				@media (--screen-desktop) {
					width: 50%;
				}
			}
		}

		&__accordion {
			display: flow-root;
		}

		&__select {
			@media (--screen-desktop) {
				display: none;
			}
		}

		&__controls {
			@media (--screen-tablet-max) {
				display: none;
			}
		}
	}
</style>
